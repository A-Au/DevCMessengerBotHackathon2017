/*
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* jshint node: true, devel: true */
'use strict';

//import apparel_tops from './apparel_list';

const 
  bodyParser = require('body-parser'),
  config = require('config'),
  crypto = require('crypto'),
  express = require('express'),
  https = require('https'),  
  request = require('request'),
  Shopify = require('shopify-api-node'),
  Clarifai = require('clarifai'),
  store = require('./store_apparel_tags.js'),
  Greeting = require('greeting'),
  apparel = require('./apparel_list.js');

var app = express();
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');
app.use(bodyParser.json({ verify: verifyRequestSignature }));
app.use(express.static('public'));

var app_clarifai = new Clarifai.App({
 apiKey: 'cc1cdb1c7b6145dc868d5e00b8965594'
});

function clarifai_predict(url){
  var colour = app_clarifai.models.predict(Clarifai.COLOR_MODEL, url).then(
      (response, error) => {
        console.log(JSON.stringify(response.outputs[0].data));
        return response.outputs[0].data;
      }
    );
  var apparel_type = app_clarifai.models.predict(Clarifai.APPAREL_MODEL, url).then(
        (response, error) => {
          console.log(JSON.stringify(response.outputs[0].data));
          return response.outputs[0].data;
        }
      );

  const prediction = { colour, apparel_type };
  console.log(JSON.stringify(prediction.colour.then(res => res)));
  //prediction.then(r => r.colour.then(res => console.log("aaaa" + JSON.stringify(res))));
  console.log("a");
  return prediction;
}

/*
 * Open config/default.json and set your config values before running this code. 
 * You can also set them using environment variables.
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
if (!(FB_APP_SECRET && FB_VALIDATION_TOKEN && FB_PAGE_ACCESS_TOKEN && SHOPIFY_SHOP_NAME && SHOPIFY_API_KEY && SHOPIFY_API_PASSWORD && HOST_URL)) {
  console.error("Missing config values");
  process.exit(1);
}

const shopify = new Shopify({
  shopName: SHOPIFY_SHOP_NAME,
  apiKey: SHOPIFY_API_KEY,
  password: SHOPIFY_API_PASSWORD
});


/*
 * Verify that the callback came from Facebook. Using the App Secret from 
 * your App Dashboard, we can verify the signature that is sent with each 
 * callback in the x-hub-signature field, located in the header.
 *
 * https://developers.facebook.com/docs/graph-api/webhooks#setup
 *
 */
function verifyRequestSignature(req, res, buf) {
  var signature = req.headers["x-hub-signature"];

  if (!signature) {
    // In DEV, log an error. In PROD, throw an error.
    console.error("Couldn't validate the signature.");
  } else {
    var elements = signature.split('=');
    var method = elements[0];
    var signatureHash = elements[1];

    var expectedHash = crypto.createHmac('sha1', FB_APP_SECRET)
                        .update(buf)
                        .digest('hex');

    //console.log("signatureHash: " + signatureHash);
    //console.log("expectedHash: " + expectedHash);

    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}

/*
 * Use your own validation token. Check that the token used in the Webhook 
 * setup is the same token used here.
 *
 */
app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === FB_VALIDATION_TOKEN) {
    console.log("[app.get] Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
});

/**
 * serves a static page for the webview
 */ 
app.get('/product_description', function(req, res) {
  var product_id = req.query['id'];
  if (product_id !== 'null') {
    console.log("[app.get] product id:" + product_id);
    var sh_product = shopify.product.get(product_id);
    sh_product.then(function(product) {
      console.log(product.options[0].values);
      res.status(200).send(product.body_html);
    }, function(error) {
      console.error("Error retrieving product");
      res.sendStatus(400).send("Error retrieving product");
    });
    
  } else {
    console.error("Product id is required");
    res.sendStatus(400).send("Product id is required");          
  }  
});

/*
 * All callbacks for Messenger are POST-ed. They will be sent to the same
 * webhook. Be sure to subscribe your app to your page to receive callbacks
 * for your page. 
 * https://developers.facebook.com/docs/messenger-platform/product-overview/setup#subscribe_app
 *
 */
app.post('/webhook', function (req, res) {
  // You must send back a status 200 to let the Messenger Platform know that you've
  // received the callback. Do that right away because the countdown doesn't stop when 
  // you're paused on a breakpoint! Otherwise, the request might time out. 
  res.sendStatus(200);
        
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object == 'page') {
    // entries may be batched so iterate over each one
    data.entry.forEach(function(pageEntry) {
      var pageID = pageEntry.id;
      var timeOfEvent = pageEntry.time;

      // iterate over each messaging event
      pageEntry.messaging.forEach(function(messagingEvent) {

        let propertyNames = [];
        for (var prop in messagingEvent) { propertyNames.push(prop)}
        console.log("[app.post] Webhook received a messagingEvent with properties: ", propertyNames.join());
        
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
          console.log("[app.post] Webhook is not prepared to handle this message.");

        }
      });
    });
  }
});

/*
 * Parse Color
 *
 * Returns an rgb from the form #rrggbb
 */
function parseColor(hash){

  var ret = [-1,-1,-1];

  ret[0] = parseInt("0x"+hash.substr(1,2));
  ret[1] = parseInt("0x"+hash.substr(3,2));
  ret[2] = parseInt("0x"+hash.substr(5,2));
  console.log(hash);
  console.log(hash.substr(1,2));
  console.log(hash.substr(3,2));
  console.log(hash.substr(5,2));

  return ret;
}

/*
 * Color Distance
 *
 * Just returns a single value based on squared error between rgb values
 *
 * Input is understood to be of the format #rrggbb
 */
function colorDistance(hash1, hash2){
  console.log('hash1 ' + hash1);
  console.log('hash2 ' + hash2);
  var dist = -1;
  var rgb1 = parseColor(hash1);
  var rgb2 = parseColor(hash2);
  console.log('hash1 ' + rgb1);
  console.log('hash2 ' + rgb2);
  var validColors = 0;

  // calculate distance
  dist = (rgb1[0] - rgb2[0]) * (rgb1[0] - rgb2[0]) +
         (rgb1[1] - rgb2[1]) * (rgb1[1] - rgb2[1]) +
         (rgb1[2] - rgb2[2]) * (rgb1[2] - rgb2[2]);

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
 function compareDist(a, b){
  // a, b are [index, distance]
  if( a[1] > b[1] )
  {
    return 1;
  }
  else if( a[1] == b[1] )
  {
    return 0;
  }
  else
  {
    return -1;
  }

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
 ;
function matchItem(item_type, usr_colors){
  console.log(store);
  var TOP = 1;
  var BOTTOM = 2;
  var FOOTWEAR = 3;
  var curDist = 200000;     var lowestIdx = -1;
  var lowestDist = 200000;  var highestIdx = -1;
  var highestDist = -1;
  var numcomps = 0;
  var distances = [];
  // fill color distances
  if(item_type == TOP) {
    for(var i = 0; i < store.apparel_tops.length; i ++){      // i - iterates apparel
      for(var j = 0; j < usr_colors.length; j ++){            // j - iterates usr colors
        for(var k = 0; k < store.apparel_items[0][store.apparel_tops[i]].color_hex.length; k++){
          curDist += colorDistance(usr_colors[j], store.apparel_items[0][store.apparel_tops[i]].color_hex[k]);
          numcomps ++;
        }
      }
      console.log("Color distance for (%s) is (%d)", store.apparel_tops[i], curDist/numcomps);
      distances.push([i, curDist/numcomps]);
      curDist = 0;
      numcomps = 0;
    }
  }
  // then sort!
  distances.sort(compareDist);

  console.log(distances);
  console.log(store.apparel_tops[distances[0][0]]);

  return [store.apparel_items[0][store.apparel_tops[distances[2][0]]].id,
          store.apparel_items[0][store.apparel_tops[distances[1][0]]].id,
          store.apparel_items[0][store.apparel_tops[distances[0][0]]].id];
};

/*
 * Message Event
 *
 * This event is called when a message is sent to your page. The 'message' 
 * object format can vary depending on the kind of message that was received.
 * Read more at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-received
 * 
 */
function receivedMessage(event) {
  var senderID = event.sender.id;
  var pageID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  //shopify.product.get(229020762139).then(res => console.log(JSON.stringify(res)));

  console.log("[receivedMessage] user (%d) page (%d) timestamp (%d) and message (%s)", 
    senderID, pageID, timeOfMessage, JSON.stringify(message));
  console.log(message);

  if (message.attachments && message.attachments.length >= 1 && message.attachments[0] && message.attachments[0].payload && message.attachments[0].payload.url) {
    var url = message.attachments[0].payload.url;
    console.log("[receivedMessage] image url: (%s)", url);
    var prediction = clarifai_predict(url);
    console.log(JSON.stringify(prediction));
    if (message.quick_reply) {
      console.log("[receivedMessage] quick_reply.payload (%s)", 
        message.quick_reply.payload);
      handleQuickReplyResponse(event);
      return;
    }
    if (prediction) {
      const col = prediction.colour.then(res => res.colors);//[0].w3c.name);
      const type = prediction.apparel_type.then(res => res.concepts);//[0].name);
      prediction.colour.then(res => console.log("aaaa" + typeof res.colors[0].w3c.name));
      console.log(typeof type);
      console.log(type);
      col.then(co => {type.then(ty => {
        var TOP = 1;
        var BOTTOM = 2;
        var FOOTWEAR = 3;
        var hits = [0,0,0];
        var realtype = ty[0].name.toLowerCase().replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()\s']/g,'');
        for(var i = 0; i < apparel.apparel_tops.length; i ++){
          if(realtype == apparel.apparel_tops[i]){
            hits[TOP] ++;
          }
        }
        for(var i = 0; i < apparel.apparel_bottoms.length; i ++){
          if(realtype == apparel.apparel_bottoms[i]){
            hits[BOTTOM] ++;
          }
        }
        for(var i = 0; i < apparel.apparel_footwear.length; i ++){
          if(realtype == apparel.apparel_footwear[i]){
            hits[FOOTWEAR] ++;
          }
        }
        console.log("Found a " + hits.sort()[2]);
        sendTextMessage(senderID,
          'Nice ' + co.length + ' ' + ty.length +
          co[0].w3c.hex + ' ' +
          co[1].w3c.hex + ' ' +
          //co[2].w3c.name.toLowerCase() + ' ' +
          ty[0].name.toLowerCase() + ' ' +
          ty[1].name.toLowerCase() + ' ' +
          ty[2].name.toLowerCase()));
        }

        sendSimilarProducts(senderID, matchItem(1, [co[0].w3c.hex, co[1].w3c.hex] ));
      });

      sendTextMessage(senderID, 'Alright, let me see what I can find for you.');
    }
  } else {

    var messageText = message.text;
    if (messageText) {

      var lcm = messageText.toLowerCase().replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()\s']/g,'');
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
          //sendHelpOptionsAsButtonTemplates(senderID);
          break;

        case 'test':
          console.log("asdasdas" + matchItem(1, ['#ffffff']));
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
function sendHelpOptionsAsButtonTemplates(recipientId) {
  console.log("[sendHelpOptionsAsButtonTemplates] Sending the help options menu"); 
  var messageData = {
    recipient: {
      id: recipientId
    },
    message:{
      attachment:{
        type:"template",
        payload:{
          template_type:"button",
          text:"Click the button before to get a list of 3 of our products.",
          buttons:[
            {
              "type":"postback",
              "title":"Get 3 products",
              "payload":JSON.stringify({action: 'QR_GET_PRODUCT_LIST', limit: 3})
            }
            // limit of three buttons 
          ]
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Someone tapped one of the Quick Reply buttons so 
 * respond with the appropriate content
 *
 */
function handleQuickReplyResponse(event) {
  var senderID = event.sender.id;
  var pageID = event.recipient.id;
  var message = event.message;
  var quickReplyPayload = message.quick_reply.payload;
  
  console.log("[handleQuickReplyResponse] Handling quick reply response (%s) from sender (%d) to page (%d) with message (%s)", 
    quickReplyPayload, senderID, pageID, JSON.stringify(message));
  
  // use branched conversation with one interaction per feature (each of which contains a variable number of content pieces)
  respondToHelpRequestWithTemplates(senderID, quickReplyPayload);
  
}

/*
 * This response uses templateElements to present the user with a carousel
 * You send ALL of the content for the selected feature and they can 
 * swipe from side to side to see it
 *
 */
function respondToHelpRequestWithTemplates(recipientId, requestForHelpOnFeature) {
  console.log("[respondToHelpRequestWithTemplates] handling help request for %s",
    requestForHelpOnFeature);
  var templateElements = [];

  var requestPayload = JSON.parse(requestForHelpOnFeature);

  var textButton = function(title, action, options) {
    var payload = options | {};
    payload = Object.assign(options, {action: action});
    return {
      "content_type":"text",
      title: title,
      payload: JSON.stringify(payload)
    };
  }

  switch (requestPayload.action) {
    case 'QR_GET_PRODUCT_LIST':
      var products = shopify.product.list({ limit: requestPayload.limit});
      products.then(function(listOfProducs) {
        listOfProducs.forEach(function(product) {
          var url = HOST_URL + "/product.html?id="+product.id;
          templateElements.push({
            title: product.title,
            subtitle: product.tags,
            image_url: product.image.src,
            buttons:[
              {
                "type":"web_url",
                "url": url,
                "title":"Read description",
                "webview_height_ratio": "compact",
                "messenger_extensions": "true"
              },
              sectionButton('Get options', 'QR_GET_PRODUCT_OPTIONS', {id: product.id})
            ]
          });
        });

        
        var messageData = {
          recipient: {
            id: recipientId
          },
          message: {
            attachment: {
              type: "template",
              payload: {
                template_type: "generic",
                elements: templateElements
              }
            }
          }
        };

        callSendAPI(messageData);

      });

      break;

    case 'QR_GET_PRODUCT_OPTIONS':
      var sh_product = shopify.product.get(requestPayload.id);
      sh_product.then(function(product) {
        var options = '';
        product.options.map(function(option) {
          options = options + option.name + ': ' + option.values.join(',') + "\n";
        });
        var messageData = {
          recipient: {
            id: recipientId
          },
          message: {
            text: options.substring(0, 640),
            quick_replies: [
              textButton('Get 3 products', 'QR_GET_PRODUCT_LIST', {limit: 3})
            ]
          },
        };
        callSendAPI(messageData);
      });
      break;
  }

}

var sectionButton = function(title, action, options) {
    var payload = options | {};
    payload = Object.assign(options, {action: action});
    return {
      type: 'postback',
      title: title,
      payload: JSON.stringify(payload)
    };
  }

function sendSimilarProducts(recipientId, ids){
  var templateElements = [];
  shopify.product.list({ids: ids.join()}).then(
    (prods, err) => {
      prods.forEach(product => {
        console.log(JSON.stringify(product));
        console.log(product.id);
        var url = HOST_URL + "/product.html?id="+product.id;
            templateElements.push({
              title: product.title,
              subtitle: product.tags,
              image_url: product.image.src,
              buttons:[
                {
                  "type":"web_url",
                  "url": url,
                  "title":"Read description",
                  "webview_height_ratio": "compact",
                  "messenger_extensions": "true"
                },
                sectionButton('Get options', 'QR_GET_PRODUCT_OPTIONS', {id: product.id})
              ]
            });
          }
        )
        console.log('ASASASASASA' + JSON.stringify(templateElements));

        var messageData = {
          recipient: {
            id: recipientId
          },
          message: {
            attachment: {
              type: "template",
              payload: {
                template_type: "generic",
                elements: templateElements.reverse()
              }
            }
          }
        };

        callSendAPI(messageData);
      }
    ).catch(err => {
      console.log(err);
    });

  }

/*
 * Delivery Confirmation Event
 *
 * This event is sent to confirm the delivery of a message. Read more about 
 * these fields at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-delivered
 *
 */
function receivedDeliveryConfirmation(event) {
  var senderID = event.sender.id; // the user who sent the message
  var recipientID = event.recipient.id; // the page they sent it from
  var delivery = event.delivery;
  var messageIDs = delivery.mids;
  var watermark = delivery.watermark;
  var sequenceNumber = delivery.seq;

  if (messageIDs) {
    messageIDs.forEach(function(messageID) {
      console.log("[receivedDeliveryConfirmation] Message with ID %s was delivered", 
        messageID);
    });
  }

  console.log("[receivedDeliveryConfirmation] All messages before timestamp %d were delivered.", watermark);
}

/*
 * Postback Event
 *
 * This event is called when a postback is tapped on a Structured Message. 
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback-received
 * 
 */
function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback 
  // button for Structured Messages. 
  var payload = event.postback.payload;

  console.log("[receivedPostback] from user (%d) on page (%d) with payload ('%s') " + 
    "at (%d)", senderID, recipientID, payload, timeOfPostback);

  respondToHelpRequestWithTemplates(senderID, payload);
}

/*
 * Send a text message using the Send API.
 *
 */
function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText, // utf-8, 640-character max
      metadata: "DEVELOPER_DEFINED_METADATA"
    }
  };

  callSendAPI(messageData);
}

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
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      if (messageId) {
        console.log("[callSendAPI] Successfully sent message with id %s to recipient %s", 
          messageId, recipientId);
      } else {
      console.log("[callSendAPI] Successfully called Send API for recipient %s", 
        recipientId);
      }
    } else {
      console.error("[callSendAPI] Send API call failed", response.statusCode, response.statusMessage, body.error);
    }
  });  
}

/*
 * Send profile info. This will setup the bot with a greeting and a Get Started button
 */
function callSendProfile() {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messenger_profile',
    qs: { access_token: FB_PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: {
      "greeting":[
          {
          "locale":"default",
          "text":`Hi there! I'm a bot here to assist you with Candyboxx's Shopify store. To get started, click the "Get Started" button or type "help".`
          }
      ] ,
      "get_started": {
        "payload": JSON.stringify({action: 'QR_GET_PRODUCT_LIST', limit: 3})
      },
      "whitelisted_domains":[
        HOST_URL
      ]
    }

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("[callSendProfile]: ", body);
      var result = body.result;
      if (result === 'success') {
        console.log("[callSendProfile] Successfully sent profile.");
      } else {
        console.error("[callSendProfile] There was an error sending profile.");
      }
    } else {
      console.error("[callSendProfile] Send profile call failed", response.statusCode, response.statusMessage, body.error);
    }
  });  
}

/*
 * Start server
 * Webhooks must be available via SSL with a certificate signed by a valid 
 * certificate authority.
 */
app.listen(app.get('port'), function() {
  console.log('[app.listen] Node app is running on port', app.get('port'));
  callSendProfile();
});

module.exports = app;

