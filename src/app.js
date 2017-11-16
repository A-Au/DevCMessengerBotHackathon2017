/*
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* jshint node: true, devel: true */

const bodyParser = require('body-parser');
const config = require('config');
const crypto = require('crypto');
const express = require('express');
// const https = require('https');
const request = require('request');
const Shopify = require('shopify-api-node');
const Clarifai = require('clarifai');
const store = require('./store_apparel_tags.js');
const Greeting = require('greeting');
const apparel = require('./apparel_list.js');

const appClarifai = new Clarifai.App({
  apiKey: 'cc1cdb1c7b6145dc868d5e00b8965594',
});

/*
 * Open config/default.json and set your config values before running this code.
 * You can also set them using environment constiables.
 *
 */

// App Secret can be retrieved from the App Dashboard
const FB_APP_SECRET = (process.env.FB_APP_SECRET) ?
  process.env.FB_APP_SECRET :
  config.get('fb_appSecret');

// Arbitrary value used to validate a webhook
const FB_VALIDATION_TOKEN = (process.env.FB_VALIDATION_TOKEN) ?
  (process.env.FB_VALIDATION_TOKEN) :
  config.get('fb_validationToken');

// Generate a page access token for your page from the App Dashboard
const FB_PAGE_ACCESS_TOKEN = (process.env.FB_PAGE_ACCESS_TOKEN) ?
  (process.env.FB_PAGE_ACCESS_TOKEN) :
  config.get('fb_pageAccessToken');

const SHOPIFY_SHOP_NAME = (process.env.SHOP_NAME) ?
  process.env.SHOP_NAME :
  config.get('sh_shopName');

const SHOPIFY_API_KEY = (process.env.SHOP_API_KEY) ?
  process.env.SHOP_API_KEY :
  config.get('sh_apiKey');

const SHOPIFY_API_PASSWORD = (process.env.SHOP_API_PASSWORD) ?
  process.env.SHOP_API_PASSWORD :
  config.get('sh_apiPassword');

const HOST_URL = (process.env.HOST_URL) ?
  process.env.HOST_URL :
  config.get('host_url');

// make sure that everything has been properly configured
if (!(FB_APP_SECRET && FB_VALIDATION_TOKEN && FB_PAGE_ACCESS_TOKEN && SHOPIFY_SHOP_NAME &&
  SHOPIFY_API_KEY && SHOPIFY_API_PASSWORD && HOST_URL)) {
  console.error('Missing config values');
  process.exit(1);
}

const shopify = new Shopify({
  shopName: SHOPIFY_SHOP_NAME,
  apiKey: SHOPIFY_API_KEY,
  password: SHOPIFY_API_PASSWORD,
});


const app = express();


/*
 * Verify that the callback came from Facebook. Using the App Secret from
 * your App Dashboard, we can verify the signature that is sent with each
 * callback in the x-hub-signature field, located in the header.
 *
 * https://developers.facebook.com/docs/graph-api/webhooks#setup
 *
 */
function verifyRequestSignature(req, res, buf) {
  const signature = req.headers['x-hub-signature'];

  if (!signature) {
    // In DEV, log an error. In PROD, throw an error.
    console.error('Couldn\'t validate the signature.');
  } else {
    const elements = signature.split('=');
    // const method = elements[0];
    const signatureHash = elements[1];

    const expectedHash = crypto.createHmac('sha1', FB_APP_SECRET)
      .update(buf)
      .digest('hex');

    // console.log('signatureHash: ' + signatureHash);
    // console.log('expectedHash: ' + expectedHash);

    if (signatureHash !== expectedHash) {
      throw new Error('Couldn\'t validate the request signature.');
    }
  }
}


app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');
app.use(bodyParser.json({ verify: verifyRequestSignature }));
app.use(express.static('public'));


function clarifaiPredict(url) {
  const colour = appClarifai.models.predict(Clarifai.COLOR_MODEL, url).then(response => (
    response.outputs[0].data
  ));
  const apparelType = appClarifai.models.predict(Clarifai.APPAREL_MODEL, url).then(response => (
    // console.log(JSON.stringify(response.outputs[0].data));
    response.outputs[0].data
  ));

  const prediction = { colour, apparelType };
  console.log(JSON.stringify(prediction.colour.then(res => res)));
  // prediction.then(r => r.colour.then(res => console.log('aaaa' + JSON.stringify(res))));
  console.log('a');
  return prediction;
}


const sectionButton = (title, action, options) => {
  // const payload = options | {};
  const payload = Object.assign(options, { action });
  return {
    type: 'postback',
    title,
    payload: JSON.stringify(payload),
  };
};


/*
 * Call the Send API. The message data goes in the body. If successful, we'll
 * get the message id in a response
 *
 */
function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: FB_PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData,
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const recipientId = body.recipient_id;
      const messageId = body.message_id;

      if (messageId) {
        console.log('[callSendAPI] Successfully sent message with id %s to recipient %s', messageId, recipientId);
      } else {
        console.log('[callSendAPI] Successfully called Send API for recipient %s', recipientId);
      }
    } else {
      console.error('[callSendAPI] Send API call failed', response.statusCode, response.statusMessage, body.error);
    }
  });
}

/*
 * Send a text message using the Send API.
 *
 */
function sendTextMessage(recipientId, messageText) {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      text: messageText, // utf-8, 640-character max
      metadata: 'DEVELOPER_DEFINED_METADATA',
    },
  };

  callSendAPI(messageData);
}


/*
 * This response uses templateElements to present the user with a carousel
 * You send ALL of the content for the selected feature and they can
 * swipe from side to side to see it
 *
 */
function respondToHelpRequestWithTemplates(recipientId, requestForHelpOnFeature) {
  console.log('[respondToHelpRequestWithTemplates] handling help request for %s', requestForHelpOnFeature);
  const templateElements = [];

  const requestPayload = JSON.parse(requestForHelpOnFeature);

  /* const textButton = (title, action, options) => {
    const payload = Object.assign(options, { action });
    return {
      content_type: 'text',
      title,
      payload: JSON.stringify(payload),
    };
  }; */

  switch (requestPayload.action) {
    case 'QR_GET_PRODUCT_LIST': {
      const products = shopify.product.list({ limit: requestPayload.limit });
      products.then((listOfProducs) => {
        listOfProducs.forEach((product) => {
          const url = `${HOST_URL}/product.html?id=${product.id}`;
          templateElements.push({
            title: product.title,
            subtitle: product.tags,
            image_url: product.image.src,
            buttons: [
              {
                type: 'web_url',
                url,
                title: 'Read description',
                webview_height_ratio: 'compact',
                messenger_extensions: 'true',
              },
              sectionButton('Get options', 'QR_GET_PRODUCT_OPTIONS', { id: product.id }),
            ],
          });
        });

        const messageData = {
          recipient: {
            id: recipientId,
          },
          message: {
            text: 'Hi, send us a picture and we\'ll find you a perfect match for what you\'ve got',
          },
        };

        callSendAPI(messageData);
      });
      break;
    }

    case 'QR_GET_PRODUCT_OPTIONS': {
      const shProduct = shopify.product.get(requestPayload.id);
      shProduct.then((product) => {
        const options = product.options.map(option => `${options}${option.name}': '${option.values.join(',')}'\n'`);
        const messageData = {
          recipient: {
            id: recipientId,
          },
          message: {
            text: 'Hi, send us a picture and we\'ll find you a perfect match for what you\'ve got',
          },
        };
        callSendAPI(messageData);
      });
      break;
    }
    default:
  }
}


/*
 * Someone tapped one of the Quick Reply buttons so
 * respond with the appropriate content
 *
 */
function handleQuickReplyResponse(event) {
  const senderID = event.sender.id;
  const pageID = event.recipient.id;
  const { message } = event;
  const quickReplyPayload = message.quick_reply.payload;

  console.log(
    '[handleQuickReplyResponse] Handling quick reply response (%s) from sender (%d) to page (%d) with message (%s)',
    quickReplyPayload,
    senderID,
    pageID,
    JSON.stringify(message),
  );
  // use branched conversation with one interaction per feature
  // (each of which contains a constiable number of content pieces)
  respondToHelpRequestWithTemplates(senderID, quickReplyPayload);
}


/*
 * Parse Color
 *
 * Returns an rgb from the form #rrggbb
 */
function parseColor(hash) {
  const ret = [-1, -1, -1];

  ret[0] = parseInt(`0x${hash.substr(1, 2)}`, 16);
  ret[1] = parseInt(`0x${hash.substr(3, 2)}`, 16);
  ret[2] = parseInt(`0x${hash.substr(5, 2)}`, 16);
  // console.log(hash);
  // console.log(hash.substr(1,2));
  // console.log(hash.substr(3,2));
  // console.log(hash.substr(5,2));

  return ret;
}

/*
 * Color Distance
 *
 * Just returns a single value based on squared error between rgb values
 *
 * Input is understood to be of the format #rrggbb
 */
function colorDistance(hash1, hash2) {
  // console.log('hash1 ' + hash1);
  // console.log('hash2 ' + hash2);
  let dist = -1;
  const rgb1 = parseColor(hash1);
  const rgb2 = parseColor(hash2);
  // console.log('hash1 ' + rgb1);
  // console.log('hash2 ' + rgb2);

  // calculate distance
  dist = ((rgb1[0] - rgb2[0]) * (rgb1[0] - rgb2[0])) +
         ((rgb1[1] - rgb2[1]) * (rgb1[1] - rgb2[1])) +
         ((rgb1[2] - rgb2[2]) * (rgb1[2] - rgb2[2]));

  return dist;
}

/*
 * Compare Color Dist
 *
 * Compares two color distances from indices in the apparel items list
 *
 * For use in array.sort(compareFunction)
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 */
function compareDist(a, b) {
  // a, b are [index, distance]
  if (a[1] > b[1]) {
    return 1;
  } else if (a[1] === b[1]) {
    return 0;
  }
  return -1;
}


/*
 *
 * Match Item
 *
 * This function searches through the store's labelled json object to find
 * any items that might match based on the colors
 *
 * We want to give back an item with high contrast and an item with low contrast.
 *
 * Therefore, we sort by color distance and return the first and last elements
 * of the list.
 */
function matchItem(itemType, usrColors) {
  console.log(store);
  const TOP = 1;
  const BOTTOM = 2;
  const FOOTWEAR = 3;
  const distances = [];
  const ret = [];

  let numcomps = 0;
  let curDist = 200000;
  // fill color distances
  if (itemType === BOTTOM || itemType === FOOTWEAR) {
    for (let i = 0; i < store.apparelTops.length; i += 1) { // i - iterates apparel
      for (let j = 0; j < usrColors.length; j += 1) { // j - iterates usr colors
        for (let k = 0; k < store.apparelItems[0][store.apparelTops[i]].color_hex.length;
          k += 1) {
          curDist += colorDistance(
            usrColors[j],
            store.apparelItems[0][store.apparelTops[i]].color_hex[k],
          );
          numcomps += 1;
        }
      }
      console.log('Color distance for (%s) is (%d)', store.apparelTops[i], curDist / numcomps);
      distances.push([i, curDist / numcomps]);
      curDist = 0;
      numcomps = 0;
    }
    // then sort!
    distances.sort(compareDist);

    console.log(distances);
    distances.reverse();

    console.log(store.apparelTops[distances[0][0]]);

    ret.push([store.apparelItems[0][store.apparelTops[distances[2][0]]].id,
      store.apparelItems[0][store.apparelTops[distances[1][0]]].id,
      store.apparelItems[0][store.apparelTops[distances[0][0]]].id]);
  }
  if (itemType === TOP || itemType === FOOTWEAR) {
    for (let i = 0; i < store.apparelBottoms.length; i += 1) { // i - iterates apparel
      for (let j = 0; j < usrColors.length; j += 1) { // j - iterates usr colors
        for (let k = 0; k < store.apparelItems[0][store.apparelBottoms[i]].color_hex.length;
          k += 1) {
          curDist += colorDistance(
            usrColors[j],
            store.apparelItems[0][store.apparelBottoms[i]].color_hex[k],
          );
          numcomps += 1;
        }
      }
      console.log('Color distance for (%s) is (%d)', store.apparelBottoms[i], curDist / numcomps);
      distances.push([i, curDist / numcomps]);
      curDist = 0;
      numcomps = 0;
    }
    // then sort!
    distances.sort(compareDist);

    console.log(distances);
    distances.reverse();
    console.log(store.apparelBottoms[distances[0][0]]);

    ret.push([store.apparelItems[0][store.apparelBottoms[distances[2][0]]].id,
      store.apparelItems[0][store.apparelBottoms[distances[1][0]]].id,
      store.apparelItems[0][store.apparelBottoms[distances[0][0]]].id]);
  }

  return ret;
}


function sendSimilarProducts(recipientId, ids) {
  const templateElements = [];
  shopify.product.list({ ids: ids.join() }).then((prods) => {
    prods.forEach((product) => {
      const url = `${HOST_URL}/product.html?id=${product.id}`;
      templateElements.push({
        title: product.title,
        subtitle: product.tags,
        image_url: product.image.src,
        buttons: [
          {
            type: 'web_url',
            url,
            title: 'Read description',
            webview_height_ratio: 'compact',
            messenger_extensions: 'true',
          },
          sectionButton('Get options', 'QR_GET_PRODUCT_OPTIONS', { id: product.id }),
        ],
      });
    });

    const messageData = {
      recipient: {
        id: recipientId,
      },
      message: {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: templateElements.reverse(),
          },
        },
      },
    };

    callSendAPI(messageData);
  }).catch((err) => {
    console.log(err);
  });
}


/*
 * Message Event
 *
 * This event is called when a message is sent to your page. The 'message'
 * object format can consty depending on the kind of message that was received.
 * Read more at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-received
 *
 */
function receivedMessage(event) {
  const senderID = event.sender.id;
  const pageID = event.recipient.id;
  const timeOfMessage = event.timestamp;
  const { message } = event;

  // shopify.product.get(229020762139).then(res => console.log(JSON.stringify(res)));

  console.log(
    '[receivedMessage] user (%d) page (%d) timestamp (%d) and message (%s)',
    senderID,
    pageID,
    timeOfMessage,
    JSON.stringify(message),
  );
  console.log(message);

  if (message.attachments && message.attachments.length >= 1 && message.attachments[0] &&
    message.attachments[0].payload && message.attachments[0].payload.url) {
    const { url } = message.attachments[0].payload;
    console.log('[receivedMessage] image url: (%s)', url);
    const prediction = clarifaiPredict(url);
    console.log(JSON.stringify(prediction));
    if (message.quick_reply) {
      console.log(
        '[receivedMessage] quick_reply.payload (%s)',
        message.quick_reply.payload,
      );
      handleQuickReplyResponse(event);
      return;
    }
    if (prediction) {
      console.log('prediction');
      const col = prediction.colour.then(res => res.colors);
      const type = prediction.apparelType.then(res => res.concepts);
      console.log(typeof type);
      console.log(type);
      col.then((co) => {
        type.then((ty) => {
          const TOP = 1;
          const BOTTOM = 2;
          const FOOTWEAR = 3;
          let foundtype = 0;
          const realtype = ty[0].name.toLowerCase().replace(/[.,\\/#!?$%^&*;:{}=\-_`~()\s']/g, '');
          console.log(realtype);
          for (let i = 0; i < apparel.apparelTops.length; i += 1) {
            if (realtype === apparel.apparelTops[i]) {
              foundtype = TOP;
            }
          }
          for (let i = 0; i < apparel.apparelBottoms.length; i += 1) {
            if (realtype === apparel.apparelBottoms[i]) {
              foundtype = BOTTOM;
            }
          }
          for (let i = 0; i < apparel.apparelFootwear.length; i += 1) {
            if (realtype === apparel.apparelFootwear[i]) {
              foundtype = FOOTWEAR;
            }
          }
          console.log(`Found a ${foundtype}`);
          sendSimilarProducts(senderID, matchItem(foundtype, [co[0].w3c.hex, co[1].w3c.hex]));
          /* console.log(
            ' ' + co.length + ' ' + ty.length +
            co[0].w3c.hex + ' ' +
            co[1].w3c.hex + ' ' +
            //co[2].w3c.name.toLowerCase() + ' ' +
            ty[0].name.toLowerCase() + ' ' +
            ty[1].name.toLowerCase() + ' ' +
            ty[2].name.toLowerCase()); */
        });
      });

      sendTextMessage(senderID, 'Alright, let me see what I can find for you.');
    }
  } else {
    const messageText = message.text;
    if (messageText) {
      const lcm = messageText.toLowerCase().replace(/[.,/#!?$%\\^&*;:{}=\-_`~()\s']/g, '');
      console.log(lcm);
      switch (lcm) {
        case 'hi':
        case 'hello':
        case 'yo':
        case 'hey':
        case 'hay':
        case 'howdy':
        case 'sup':
        case 'heyman':
        case 'howsitgoing':
        case 'howareyoudoing':
        case 'whatsup':
        case 'wassup':
        case 'whatsgoingon':
        case 'goodmorning':
        case 'goodevening':
        case 'goodafternoon':
        case 'whazzup':
        case 'hiya':
        case 'gday':
          sendTextMessage(senderID, Greeting.random());
          break;
        case 'help':
          sendTextMessage(senderID, 'Try sending us a picture of a piece of apparel like your favourite pair of pants and we will try and find the perfect match for them!');
          break;

        case 'test':
          sendSimilarProducts(senderID, matchItem(1, ['#ffffff']));
          break;

        case 'test2':
          matchItem(1, ['#ffffff']);
          break;

        default:
          // otherwise, just echo it back to the sender
          sendTextMessage(senderID, messageText);
      }
    }
  }
}


/*
 * Send a message with buttons.
 *
 */
/* function sendHelpOptionsAsButtonTemplates(recipientId) {
  console.log('[sendHelpOptionsAsButtonTemplates] Sending the help options menu');
  const messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: 'Click the button before to get a list of 3 of our products.',
          buttons: [
            {
              type: 'postback',
              title: 'Get 3 products',
              payload: JSON.stringify({ action: 'QR_GET_PRODUCT_LIST', limit: 3 }),
            },
            // limit of three buttons
          ],
        },
      },
    },
  };

  callSendAPI(messageData);
} */


/*
 * Delivery Confirmation Event
 *
 * This event is sent to confirm the delivery of a message. Read more about
 * these fields at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-delivered
 *
 */
function receivedDeliveryConfirmation(event) {
  // const senderID = event.sender.id; // the user who sent the message
  // const recipientID = event.recipient.id; // the page they sent it from
  const { delivery: { watermark, mids: messageIDs } } = event;
  // const sequenceNumber = delivery.seq;

  if (messageIDs) {
    messageIDs.forEach((messageID) => {
      console.log('[receivedDeliveryConfirmation] Message with ID %s was delivered', messageID);
    });
  }

  console.log('[receivedDeliveryConfirmation] All messages before timestamp %d were delivered.', watermark);
}

/*
 * Postback Event
 *
 * This event is called when a postback is tapped on a Structured Message.
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback-received
 *
 */
function receivedPostback(event) {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback
  // button for Structured Messages.
  const { payload } = event.postback;

  console.log('[receivedPostback] from user (%d) on page (%d) with payload (\'%s\') ' +
    'at (%d)', senderID, recipientID, payload, timeOfPostback);

  respondToHelpRequestWithTemplates(senderID, payload);
}


/*
 * Use your own validation token. Check that the token used in the Webhook
 * setup is the same token used here.
 *
 */
app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === FB_VALIDATION_TOKEN) {
    console.log('[app.get] Validating webhook');
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error('Failed validation. Make sure the validation tokens match.');
    res.sendStatus(403);
  }
});

/**
 * serves a static page for the webview
 */
app.get('/product_description', (req, res) => {
  const productId = req.query.id;
  if (productId !== 'null') {
    console.log(`[app.get] product id: ${productId}`);
    const shProduct = shopify.product.get(productId);
    shProduct.then((product) => {
      console.log(product.options[0].values);
      res.status(200).send(product.body_html);
    }, () => {
      console.error('Error retrieving product');
      res.sendStatus(400).send('Error retrieving product');
    });
  } else {
    console.error('Product id is required');
    res.sendStatus(400).send('Product id is required');
  }
});

/*
 * All callbacks for Messenger are POST-ed. They will be sent to the same
 * webhook. Be sure to subscribe your app to your page to receive callbacks
 * for your page.
 * https://developers.facebook.com/docs/messenger-platform/product-overview/setup#subscribe_app
 *
 */
app.post('/webhook', (req, res) => {
  // You must send back a status 200 to let the Messenger Platform know that you've
  // received the callback. Do that right away because the countdown doesn't stop when
  // you're paused on a breakpoint! Otherwise, the request might time out.
  res.sendStatus(200);
  const data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {
    // entries may be batched so iterate over each one
    data.entry.forEach((pageEntry) => {
      // const pageID = pageEntry.id;
      // const timeOfEvent = pageEntry.time;
      // iterate over each messaging event
      pageEntry.messaging.forEach((messagingEvent) => {
        const propertyNames = [];
        Object.keys(messagingEvent).forEach(p => propertyNames.push(p));
        // for (const prop in messagingEvent) { propertyNames.push(prop); }
        console.log('[app.post] Webhook received a messagingEvent with properties: ', propertyNames.join());
        if (messagingEvent.message) {
          // someone sent a message
          receivedMessage(messagingEvent);
        } else if (messagingEvent.delivery) {
          // messenger platform sent a delivery confirmation
          receivedDeliveryConfirmation(messagingEvent);
        } else if (messagingEvent.postback) {
          // user replied by tapping one of our postback buttons
          receivedPostback(messagingEvent);
        } else {
          console.log('[app.post] Webhook is not prepared to handle this message.');
        }
      });
    });
  }
});


/*
 * Send profile info. This will setup the bot with a greeting and a Get Started button
 */
function callSendProfile() {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messenger_profile',
    qs: { access_token: FB_PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: {
      greeting: [
        {
          locale: 'default',
          text: 'Hi there! I\'m a bot here to assist you with Candyboxx\'s Shopify store. To get started, click the \'Get Started\' button or type \'help\'.',
        },
      ],
      get_started: {
        payload: JSON.stringify({ action: 'QR_GET_PRODUCT_LIST', limit: 3 }),
      },
      whitelisted_domains: [
        HOST_URL,
      ],
    },

  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      console.log('[callSendProfile]: ', body);
      const { result } = body;
      if (result === 'success') {
        console.log('[callSendProfile] Successfully sent profile.');
      } else {
        console.error('[callSendProfile] There was an error sending profile.');
      }
    } else {
      console.error('[callSendProfile] Send profile call failed', response.statusCode, response.statusMessage, body.error);
    }
  });
}

/*
 * Start server
 * Webhooks must be available via SSL with a certificate signed by a valid
 * certificate authority.
 */
app.listen(app.get('port'), () => {
  console.log('[app.listen] Node app is running on port', app.get('port'));
  callSendProfile();
});

module.exports = app;

