// const apparel_type_tops = ["Tank Top", "Sports Bra", "Bodysuit",
// 							"Turtleneck", "Sweatshirt", "Hoodies",
// 							"T-Shirt", "Activewear T Shirt",
// 							"Halter Top", "Sweater",
// 							"Peacoat"];
// const apparel_type_bottoms = ["Sarong", "Capris", "Tights", "Leggings",
// 								"Wide Leg Pants", "Sweatpants"];

// const apparel_type_footwear = ["Sneakers", "Oxfords", "Men's Sandals", "Men's Boots",
// 								"Women's Boots"]

// const color_coded = {
// 	"Plum": "#be79a6",
// 	"Gray": "#87827f",
// };

const apparel_bottoms = [
	"Amaal Leggings",
	"Ankle Strap Leggings",
	"Anna High Performance Tank - Black",
	"Anna High Performance Tank - Lemon",
	"3/4 Guggenheim Leggings",
	"Ambu Leggings",
	"Anise Leggings",
	"Anna High Performance Leggings",
	"Asana Yoga Set",
	"BIONIC CAPRI",
	"Eden Running Shorts",
	"Navy Blue Sports Trousers",
	"Priya Leggings"
];

const apparel_tops = [
	"Asana Yoga Set",
	"Aura Yoga Top",
	"Coffee Yoga Wine Repeat T-Shirt",
	"Elephant Fleece Hoodie",
	"Pink Propel Funnel Neck Pullover",
	"RCRP T-Shirt",
	"RCRP Tank Top",
];

const apparel_items = [{
// Amaal Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_ba8e1802-8a49-450c-9333-a2f2b7e4791a_360x.jpg?v=1508425248
"Amaal Leggings": {
	"apparel":["sarong","capris","leggings","tights"],
	"color":["darksalmon","dimgray","lightslategray","palevioletred","darkgray","purple"],
	"color_hex":["#eb5aa4","#6a5572"],
	"id":[229020762139]
},

// Ankle Strap Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/d1cea9ff4d0f26dc9c52caab96124fe0_540x.jpg?v=1508425179
"Ankle Strap Leggings" : {
	"apparel":["tights","capris","leggings"],
	"color":["black"],
	"color_hex":["#261c1c","#010101"],
	"id":[229008506907]
},

// Anna High Performance Tank - Black
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_c4da334d-873f-4161-8b19-7285a6c7e2e4_360x.jpg?v=1508425284
"Anna High Performance Tank - Black" : {
	"apparel":["tanktop","sportsbra","bodysuit"],
	"color":["black"],
	"color_hex":["#030303"],
	"id":[229027708955]
},

// Anna High Performance Tank - Lemon
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_934ed483-d229-45c9-988d-cb4b84fa0d66_360x.jpg?v=1508425302
"Anna High Performance Tank - Lemon" : {
	"apparel":["tanktop","sportsbra","bodysuit"],
	"color":["palegoldenrod","lemon"],
	"color_hex":["#faf5b3","#151626"],
	"id":[22902993717]
},

// 3/4 Guggenheim Leggnings
// https://cdn.shopify.com/s/files/1/2463/4523/products/a3c2861cb303ef8ee9f0769f44292958_540x.jpg?v=1508425143
"3/4 Guggenheim Leggings": {
	"apparel":["capris","tights","overalls","leggings"],
	"color":["lightsteelblue","white","darkslateblue"],
	"color_hex":["#91a4f0","#2554a7"],
	"id":[228999495707]
},

// Ambu Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_b5f36b8a-53ba-44ea-bf6e-0a6b6e86fa83_540x.jpg?v=1508425309
"Ambu Leggings": {
	"apparel":["capris","bodysuit","tights","leggings"],
	"color":["darkslategray","rosybrown","tan","pink"],
	"color_hex":["#998e90","#192c60"],
	"id":[229030559771]
},

// Anise Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_efc195b5-c2d4-4652-b58a-586ed3334882_540x.jpg?v=1508425311
"Anise Leggings": {
	"apparel":["women'sshorts","capris","sarong","leggings","tights"],
	"color":["black","darkslateblue"],
	"color_hex":["#383f5d","#94a7ac"],
	"id":[229030821915]
},

// Anna High Performance Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_65d43591-3f71-4225-a8ac-35083a8874bb_360x.jpg?v=1508425305
"Anna High Performance Leggings": {
	"apparel":["capris","tights","jumpsuit","leggings"],
	"color":["palegoldenrod","dimgray","black"],
	"color_hex":["#faf5b3","#151626"],
	"id":[229030166555]
},

// END OF PAGE 1

// Asana Yoga Set
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_d0a19680-a8fb-459e-9b02-786e30172c9b_900x.jpg?v=1508425316
"Asana Yoga Set": {
	"apparel":["jumpsuit","capris","tights","bodysuit","sportsbra","leggings"],
	"color":["lightgray","darkslategray"],
	"color_hex":["#698398","#5e7686"],
	"id":[229031313435]
},

// Aura Yoga Top
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_938f46d2-6b07-435d-8938-f8a1d8958e38_540x.jpg?v=1508425339
"Aura Yoga Top": {
	"apparel":["tanktop","haltertop","tankini"],
	"color":["black","lightsteelblue","steelblue","darkslateblue","slategray","darkseagreen"],
	"color_hex":["#aab55c","#457ac4"],
	"id":[229035376667]
},

// BIONIC CAPRI
// https://cdn.shopify.com/s/files/1/2463/4523/products/04d6b5c9e62a8eba216b96a392f482db_540x.jpg?v=1508425109
"BIONIC CAPRI": {
	"apparel":["capris","leggings"],
	"color":["black"],
	"color_hex":["#48403e","#1d1e21"],
	"id":[228991074331]
},

// Coffee Yoga Wine Repeat T-Shirt
// https://cdn.shopify.com/s/files/1/2463/4523/products/0b1e259beaaeb99e48ef67f20369771d_360x.jpg?v=1508425068
"Coffee Yoga Wine Repeat T-Shirt": {
	"apparel":["t-shirt","activeweartshirt"],
	"color":["brown","palevioletred"],
	"color_hex":["#c3303e","#bc2836"],
	"id":[228979277851]
},

// Eden Running Shorts
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_041c2e9d-9469-4b0d-a98b-b8527bfef916_360x.jpg?v=1508425266
"Eden Running Shorts": {
	"apparel":["women'sshorts","women'sboardshorts"],
	"color":["purple","palevioletred","darkslateblue"],
	"color_hex":["#7e46a5","#cf0067","#9dd7cf"],
	"id":[229024366619]
},

// Elephant Fleece Hoodie
// https://cdn.shopify.com/s/files/1/2463/4523/products/eb4f31471504d0b9274d6ca511bbc973_360x.jpg?v=1508424975
"Elephant Fleece Hoodie": {
	"apparel":["sweatshirt","hoodies","sweater"],
	"color":["gray","white","plum"],
	"color_hex":["#d7d2ca","#333f47"],
	"id":[228954898459]
},

// Navy Blue Sports Trousers
// https://cdn.shopify.com/s/files/1/2463/4523/products/f6bd875fff774892f53448d129da819a_360x.jpg?v=1508425170
"Navy Blue Sports Trousers": {
	"apparel":["widelegpants","capris","sweatpants"],
	"color":["black","darkslateblue"],
	"color_hex":["#141522","#0f101b"],
	"id":[229006442523]
},

// Pink Propel Funnel Neck Pullover
// https://cdn.shopify.com/s/files/1/2463/4523/products/0d96b36acdab446cd6e2cd82801ff954_360x.jpg?v=1508425086
"Pink Propel Funnel Neck Pullover": {
	"apparel":["turtleneck","sweatshirt","hoodies"],
	"color":["orchid","plum"],
	"color_hex":["#ee50c1","#e448b8"],
	"id":[228984553499]
},

// Priya Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_87405b43-6d13-4cd1-8214-41be49e2fb93_360x.jpg?v=1508425328
"Priya Leggings": {
	"apparel":["capris","leggings","tights"],
	"color":["palevioletred"],
	"color_hex":["#c86590","#33172b"],
	"id":[2290330501]
},

// RCRP T-Shirt
// https://cdn.shopify.com/s/files/1/2463/4523/products/37646f843f80cf60d013c1e31d107960_360x.jpg?v=1508425145
"RCRP T-Shirt": {
	"apparel":["t-shirt","activeweartshirt"],
	"color":["white"],
	"color_hex":["#e0dddf"],
	"id":[228999856155]
},

// RCRP Tank Top
// https://cdn.shopify.com/s/files/1/2463/4523/products/70fe678927271e4d6fce3ae5d4dcc5e5_360x.jpg?v=1508425151
"RCRP Tank Top": {
	"apparel":["tanktop","haltertop"],
	"color":["white"],
	"color_hex":["dfded8"],
	"id":[229001199643]
}

}];

export { "apparel_tops": apparel_tops, 
		 "apparel_bottoms": apparel_bottoms, 
		 "apparel_items": apparel_items };