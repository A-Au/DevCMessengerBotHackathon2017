const apparel_type_tops = ["Tank Top", "Sports Bra", "Bodysuit",
							"Turtleneck", "Sweatshirt", "Hoodies",
							"T-Shirt", "Activewear T Shirt",
							"Halter Top", "Sweater"];
const apparel_type_bottoms = ["Sarong", "Capris", "Tights", "Leggings",
								"Wide Leg Pants", "Sweatpants"];

const color_coded = {
	"Plum": "#be79a6",
	"Gray": "#87827f",
};

const apparel_items = [{
// Amaal Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_ba8e1802-8a49-450c-9333-a2f2b7e4791a_360x.jpg?v=1508425248
"Amaal Leggings": {
	"Apparel" : ["Sarong", "Capris"],
	"Color" : ["DarkSalmon", "DimGray", "LightSlateGray", "PaleVioletRed", "DarkGray"],
	"Apparel_h" : ["Leggings", "Tights"],
	"Color_h" : ["Purple"],
	"Color_hex": ["#eb5aa4", "#6a5572"]
},

// Ankle Strap Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/d1cea9ff4d0f26dc9c52caab96124fe0_540x.jpg?v=1508425179
"Ankle Strap Leggings" : {
	"Apparel" : ["Tights", "Capris", "Leggings"],
	"Color" : ["Black"],
	"Apparel_h" : [],
	"Color_h" : [],
	"Color_hex": ["#261c1c", "#010101"]
},

// Anna High Performance Tank - Black
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_c4da334d-873f-4161-8b19-7285a6c7e2e4_360x.jpg?v=1508425284
"Anna High Performance Tank - Black" : {
	"Apparel" : ["Tank Top", "Sports Bra", "Bodysuit"],
	"Color" : ["Black"],
	"Apparel_h": [],
	"Color_h": [],
	"Color_hex": ["#030303"]
},

// Anna High Performance Tank - Lemon
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_934ed483-d229-45c9-988d-cb4b84fa0d66_360x.jpg?v=1508425302
"Anna High Performance Tank - Lemon" : {
	"Apparel": ["Tank Top", "Sports Bra", "Bodysuit"],
	"Color": ["PaleGoldenRod"],
	"Apparel_h": [],
	"Color_h": ["Lemon"],
	"Color_hex": ["#faf5b3", "#151626"]
},

// 3/4 Guggenheim Leggnings
// https://cdn.shopify.com/s/files/1/2463/4523/products/a3c2861cb303ef8ee9f0769f44292958_540x.jpg?v=1508425143
"3/4 Guggenheim Leggings": {
	"Apparel": ["Capris", "Tights", "Overalls"],
	"Color": ["LightSteelBlue", "White", "DarkSlateBlue"],
	"Apparel_h": ["Leggings"],
	"Color_h": [],
	"Color_hex": ["#91a4f0", "#2554a7"]
},

// Ambu Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_b5f36b8a-53ba-44ea-bf6e-0a6b6e86fa83_540x.jpg?v=1508425309
"Ambu Leggings": {
	"Apparel": ["Capris", "Bodysuit", "Tights"],
	"Color": ["DarkSlateGray", "RosyBrown", "Tan"],
	"Apparel_h": ["Leggings"],
	"Color_h": ["Pink"],
	"Color_hex": ["#998e90", "#192c60"]
},

// Anise Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_efc195b5-c2d4-4652-b58a-586ed3334882_540x.jpg?v=1508425311
"Anise Leggings": {
	"Apparel": ["Women's Shorts", "Capris", "Sarong"],
	"Color": ["Black"],
	"Apparel_h": ["Leggings", "Tights"],
	"Color_h": ["DarkSlateBlue"],
	"Color_hex": ["#383f5d", "#94a7ac"]
},

// Anna High Performance Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_65d43591-3f71-4225-a8ac-35083a8874bb_360x.jpg?v=1508425305
"Anna High Performance Leggings": {
	"Apparel": ["Capris", "Tights", "Jumpsuit"],
	"Color": ["PaleGoldenRod", "DimGray"],
	"Apparel_h": ["Leggings"],
	"Color_h": ["Black"],
	"Color_hex": ["#faf5b3", "#151626"]
},

// END OF PAGE 1

// Asana Yoga Set
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_d0a19680-a8fb-459e-9b02-786e30172c9b_900x.jpg?v=1508425316
"Asana Yoga Set": {
	"Apparel": ["Jumpsuit", "Capris", "Tights", "Bodysuit", "Sports Bra"],
	"Color": ["LightGray", "DarkSlateGray"],
	"Apparel_h": ["Leggings"],
	"Color_h": [],
	"Color_hex", ["#698398", "#5e7686"]
},

// Aura Yoga Top
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_938f46d2-6b07-435d-8938-f8a1d8958e38_540x.jpg?v=1508425339
"Aura Yoga Top": {
	"Apparel": ["Tank Top", "Halter Top", "Tankini"],
	"Color": ["Black", "LightSteelBlue", "SteelBlue", "DarkSlateBlue", "SlateGray", "DarkSeaGreen"],
	"Apparel_h": [],
	"Color_h": [],
	"Color_hex": ["#aab55c", "#457ac4"]
},

// BIONIC CAPRI
// https://cdn.shopify.com/s/files/1/2463/4523/products/04d6b5c9e62a8eba216b96a392f482db_540x.jpg?v=1508425109
"BIONIC CAPRI": {
	"Apparel": ["Capris"],
	"Color": ["Black"],
	"Apparel_h": ["Leggings"],
	"Color_h": [],
	"Color_hex": ["#48403e", "#1d1e21"]
},

// Black Muse Lucy Printed Performance Leggings - Women
// https://cdn.shopify.com/s/files/1/2463/4523/products/0d84e5e4fe033203eac9c5e858fa5773_540x.jpg?v=1508424985
"Black Muse Lucy Printed Performance Leggings - Women": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
},

// Black Propel Funnel Neck Pullover
// https://cdn.shopify.com/s/files/1/2463/4523/products/82055d5c448991924071bddf5cf87efc_540x.jpg?v=1508425084
"Black Propel Funnel Neck Pullover": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
},

// Black Rushour Capri
// https://cdn.shopify.com/s/files/1/2463/4523/products/4e36ca758cadd738192b29909d90c35b_540x.jpg?v=1508425093
"Black Rushour Capri": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Brahma Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_b1cd95ad-af5e-4014-8338-105536ee51f4_540x.jpg?v=1508425321
"Brahma Leggings": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Cali Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_99eb4669-c199-4f88-b813-a169354debc5_540x.jpg?v=1508425313
"Cali Leggings": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// END OF PAGE 2

// Carnaval Ellie Performance Leggings Cute Summer Yoga Pant - Women
// https://cdn.shopify.com/s/files/1/2463/4523/products/4b474bca6b5ac2faf10214def05fb2c0_360x.jpg?v=1508425237
"Carnaval Ellie Performance Leggings Cute Summer Yoga Pant - Women": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Carnaval Stella Seamless Racerback Sport Yoga Bra - Women
// https://cdn.shopify.com/s/files/1/2463/4523/products/9c0383f9c39d32f0cc6e2e6d6561afe6_360x.jpg?v=1508425228
"Carnaval Stella Seamless Racerback Sport Yoga Bra - Women": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Catarina Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_d1d0633c-6185-4f91-99c1-0cc60a1c5696_360x.jpg?v=1508425325
"Catarina Leggings": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Chaya High Performance Capri
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_21f6d005-c031-453a-ad07-29fd7f0d2a2e_360x.jpg?v=1508425279
"Chaya High Performance Capri": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Cleo Capri Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_8056bf4a-65bb-4cb1-8153-1b36932cc433_360x.jpg?v=1508425328
"Cleo Capri Leggings": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Coffee Yoga Wine Repeat T-Shirt
// https://cdn.shopify.com/s/files/1/2463/4523/products/0b1e259beaaeb99e48ef67f20369771d_360x.jpg?v=1508425068
"Coffee Yoga Wine Repeat T-Shirt": {
	"Apparel": ["T-Shirt", "Activewear T Shirt"],
	"Color": ["Brown"],
	"Apparel_h": [],
	"Color_h": ["PaleVioletRed"],
	"Color_hex": ["#c3303e", "#bc2836"]
}

// Colorful Lines Pattern Keep Fit Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/25e65e8946aaa78cc7b6d7f4134f09b8_360x.jpg?v=1508425160
"Colorful Lines Pattern Keep Fit Leggings": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Crisscross Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/bb308067172f8c64817c0d23c7124e08_360x.jpg?v=1508425192
"Crisscross Leggings": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// END OF PAGE 3

// Deepthi Yoga Set
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_3d579b98-cd9e-4aad-badf-30238189d192_360x.jpg?v=1508425336
"Deepthi Yoga Set": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Dharma Workout Capri
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_45bf5956-a49a-48d9-bfb4-0b9b17296835_360x.jpg?v=1508425278
"Dharma Workout Capri": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Eden Running Shorts
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_041c2e9d-9469-4b0d-a98b-b8527bfef916_360x.jpg?v=1508425266
"Eden Running Shorts": {
	"Apparel": ["Women's Shorts", "Women's Board Shorts"],
	"Color": ["Purple", "PaleVioletRed", "DarkSlateBlue"],
	"Apparel_h": [],
	"Color_h": [],
	"Color_hex": ["#7e46a5", "#cf0067", "#9dd7cf"]
}

// Elephant Fleece Hoodie
// https://cdn.shopify.com/s/files/1/2463/4523/products/eb4f31471504d0b9274d6ca511bbc973_360x.jpg?v=1508424975
"Elephant Fleece Hoodie": {
	"Apparel": ["Sweatshirt", "Hoodies", "Sweater"],
	"Color": ["Gray", "White", "Plum"],
	"Apparel_h": [],
	"Color_h": [],
	"Color_hex": ["#d7d2ca", "#333f47"]
}

// Esha Yoga Top
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_28a8572a-cc18-4390-b65a-88303d864c0f_360x.jpg?v=1508425341
"Esha Yoga Top": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Esme Workout Top
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_f34c75e9-0cd8-470d-ad93-e26385a1486c_360x.jpg?v=1508425277
"Esme Workout Top": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Flaming Hibiscus Ellie Yellow Performance Yoga Capri Leggings - Women
// https://cdn.shopify.com/s/files/1/2463/4523/products/2c04d1a3e7cfda89d2b756fba5b0775d_360x.jpg?v=1508425241
"Flaming Hibiscus Ellie Yellow Performance Yoga Capri Leggings - Women": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// FLAWLESS Unisex Zip Hoodie
// https://cdn.shopify.com/s/files/1/2463/4523/products/f051bf2aeb24390d1c8f4c4cc56c0769_360x.jpg?v=1508424979
"FLAWLESS Unisex Zip Hoodie": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// END OF PAGE 4

// Forever Young Lucy Baby Blue Floral Performance Yoga Leggings - Women
// https://cdn.shopify.com/s/files/1/2463/4523/products/7477383e19b9f33ca28d41630fc1c6ff_360x.jpg?v=1508425233
"Forever Young Lucy Baby Blue Floral Performance Yoga Leggings - Women": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Grey And Orange Keep Fit Top
// https://cdn.shopify.com/s/files/1/2463/4523/products/d8530ad73afbdbc71903b258d3355431_360x.jpg?v=1508425156
"Grey And Orange Keep Fit Top": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Grey And Orange Keep Fit Trousers
// https://cdn.shopify.com/s/files/1/2463/4523/products/b7e942d4816053f73ad06b0e25e7e5ae_360x.jpg?v=1508425167
"Grey And Orange Keep Fit Trousers": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Grey Marl Keep Fit Trousers With Zip And Stud Pocket Detail
// https://cdn.shopify.com/s/files/1/2463/4523/products/b959ddbe1a2862bf309cadd37694ed6c_360x.jpg?v=1508425164
"Grey Marl Keep Fit Trousers With Zip And Stud Pocket Detail": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Gym & Juice T-Shirt
// https://cdn.shopify.com/s/files/1/2463/4523/products/baf2a385484c28a4f25f3a51232e99e8_360x.jpg?v=1508425034
"Gym & Juice T-Shirt": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Harlow Fitness Jacket - Pink
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_236e5318-cebf-43e1-ade6-31053ba6b033_360x.jpg?v=1508425263
"Harlow Fitness Jacket - Pink": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Harlow Fitness Jacket - Yellow
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_99f1bae3-9ee2-4e7d-a4ba-793644656e81_360x.jpg?v=1508425262
"Harlow Fitness Jacket - Yellow": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Hoodies women oversized Sweatshirt
// https://cdn.shopify.com/s/files/1/2463/4523/products/d842d2271526653afd32550495396b1a_cb1b086c-fe1c-4782-abb2-4cb4c02ea88e_360x.jpg?v=1508424969
"Hoodies women oversized Sweatshirt": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// END OF PAGE 5

// I do Yoga to Relieve Stress...T-Shirt
// https://cdn.shopify.com/s/files/1/2463/4523/products/44fa9fe236b3021cc04005da8b357795_360x.jpg?v=1508425052
"I do Yoga to Relieve Stress...T-Shirt": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Indian Summer Lucy Yellow Floral Printed Performance Yoga Pants - Women
// https://cdn.shopify.com/s/files/1/2463/4523/products/484034751c4e1f38aa09354f960ccd77_360x.jpg?v=1508425234
"Indian Summer Lucy Yellow Floral Printed Performance Yoga Pants - Women": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Innocent Looking With...T-Shirt
// https://cdn.shopify.com/s/files/1/2463/4523/products/dd8d7ca07e13235952a905cc421115fe_360x.jpg?v=1508425000
"Innocent Looking With...T-Shirt": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Jessa Mesh Hoodie
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_b5cab273-5df8-4068-b1e6-a8ab2c0bd746_360x.jpg?v=1508425283
"Jessa Mesh Hoodie": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Kaleidoscope Ellie Geometric Print Performance Capri Yoga Pant - Women
// https://cdn.shopify.com/s/files/1/2463/4523/products/f370cd341cc6c0e329ecad87f21dab42_360x.jpg?v=1508425240
"Kaleidoscope Ellie Geometric Print Performance Capri Yoga Pant - Women": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Kaleidoscope Lucy Blue Geometric Print Performance Yoga Leggings - Women
// https://cdn.shopify.com/s/files/1/2463/4523/products/b58c6d711ce44710b50ac1625d4cc533_360x.jpg?v=1508425232
"Kaleidoscope Lucy Blue Geometric Print Performance Yoga Leggings - Women": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Janvi Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/365me_1003_Black_1_360x.jpg?v=1508425250
"Janvi Leggings": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Kaleidoscope Stella Seamless Racerback Sport Yoga Bra - Women
// https://cdn.shopify.com/s/files/1/2463/4523/products/081ef9ec236c47598ae79e0750da1d82_360x.jpg?v=1508425244
"Kaleidoscope Stella Seamless Racerback Sport Yoga Bra - Women": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// END OF PAGE 6

// Kareena Yoga Set
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_26f0850c-8b10-453e-992f-d5add831de67_360x.jpg?v=1508425314
"Kareena Yoga Set": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Kavita Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_a5a57a47-be40-4803-b37b-fd5b0c08842b_360x.jpg?v=1508425246
"Kavita Leggings": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Kianna Capri Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_f20031e4-a74b-4721-b0a4-63a7b1234ff3_360x.jpg?v=1508425326
"Kianna Capri Leggings": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Kismet Workout Legging
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_916d79c7-59f6-4763-9895-425c5663f31b_360x.jpg?v=1508425270
"Kismet Workout Legging": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Larisa High Performance Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_c985a2eb-a97f-4ef0-b587-017a48ecc6b6_360x.jpg?v=1508425304
"Larisa High Performance Leggings": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Larisa Sports Top
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_6578a00c-11a8-49ab-8d0f-36307b87ba5c_360x.jpg?v=1508425300
"Larisa Sports Top": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Lia High Performance Capri
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_09d25b2a-b077-4478-bc10-e9c2be3aeba2_360x.jpg?v=1508425281
"Lia High Performance Capri": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Love Song Lucy Red SUmmer Floral Performance Yoga Leggings - Women
// https://cdn.shopify.com/s/files/1/2463/4523/products/21a85cb718a5615083cbdeedf6dc924c_360x.jpg?v=1508424986
"Love Song Lucy Red SUmmer Floral Performance Yoga Leggings - Women": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// END OF PAGE 7

// Lynn Tank
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_58e307c0-def5-4e40-b39d-755d5b504a4b_360x.jpg?v=1508425307
"Lynn Tank": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Marble Zigzag Crop Legging
// https://cdn.shopify.com/s/files/1/2463/4523/products/093c65a8328789259646910e249d9f3a_ea97fa41-e97b-4eeb-a3e9-3f301a69345e_360x.jpg?v=1508425208
"Marble Zigzag Crop Legging": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Miriam Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_1aa7feef-364e-444a-b7d3-4565c005e84d_360x.jpg?v=1508425310
"Miriam Leggings": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Marilyn Yoga Top
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_6170a6de-28cc-4d23-a5d5-61192a0f18da_360x.png?v=1508425340
"Marilyn Yoga Top": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Meena Open Sided Tank
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_df4188c9-22c6-4c69-a59b-8cfe5bd3f5bc_360x.jpg?v=1508425287
"Meena Open Sided Tank": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// MESH JACKET
// https://cdn.shopify.com/s/files/1/2463/4523/products/1f134a9d84d629a3f8dc4fdd45c15fd4_360x.jpg?v=1508425105
"MESH JACKET": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Midnight Glow Ellie Performance Capri Leggings - Women
// https://cdn.shopify.com/s/files/1/2463/4523/products/c55f65f08def8b664ef858e106e0661f_360x.jpg?v=1508425124
"Midnight Glow Ellie Performance Capri Leggings - Women": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Midnight Glow Lucy Purple Performance Leggings - Women
// https://cdn.shopify.com/s/files/1/2463/4523/products/97d9aa3405be17e03cf4657d523e92e4_360x.jpg?v=1508425122
"Midnight Glow Lucy Purple Performance Leggings - Women": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// END OF PAGE 8

// Midnight Glow Stella Seamless Racerback Sport Bra - Women
// https://cdn.shopify.com/s/files/1/2463/4523/products/c64fdc092c760daa6d7eb932add677b6_360x.jpg?v=1508425125
"Midnight Glow Stella Seamless Racerback Sport Bra - Women": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// MIDRIFF CUTOUT BRATOP
// https://cdn.shopify.com/s/files/1/2463/4523/products/468c43e38db153daaebe1ad8732ff643_360x.jpg?v=1508425097
"MIDRIFF CUTOUT BRATOP": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Navy Blue Sports Trousers
// https://cdn.shopify.com/s/files/1/2463/4523/products/f6bd875fff774892f53448d129da819a_360x.jpg?v=1508425170
"Navy Blue Sports Trousers": {
	"Apparel": ["Wide Leg Pants", "Capris"],
	"Color": ["Black"],
	"Apparel_h": ["Sweatpants"],
	"Color_h": ["DarkSlateBlue"],
	"Color_hex": ["#141522", "#0f101b"]
}

// Navy Rushhour Capri
// https://cdn.shopify.com/s/files/1/2463/4523/products/b050bca1b5d577ea75da78e3efaaac4c_360x.jpg?v=1508425087
"Navy Rushhour Capri": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Navy Rushhour Legging
// https://cdn.shopify.com/s/files/1/2463/4523/products/53ee704c7d8be65af841537d5311ee95_360x.jpg?v=1508425090
"Navy Rushhour Legging": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Navy Rushhour Racerback Tank
// https://cdn.shopify.com/s/files/1/2463/4523/products/22675453d052a0beba8204628a6f1212_360x.jpg?v=1508425083
"Navy Rushhour Racerback Tank": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Neha Flyaway Top - Black
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_8f0fec64-4190-4770-b121-a996a7a6d4e3_360x.jpg?v=1508425274
"Neha Flyaway Top - Black": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Neha Flyaway Top - White
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_7914f778-a843-48eb-b60d-158f1af44d25_360x.jpg?v=1508425275
"Neha Flyaway Top - White": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// END OF PAGE 9

// Nephrite Fantasy Ellie Performance Capri Leggings - Women
// https://cdn.shopify.com/s/files/1/2463/4523/products/67407d8c2ec326519acdd72765e4af04_360x.jpg?v=1508425127
"Nephrite Fantasy Ellie Performance Capri Leggings - Women": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Nephrite Fantasy Stella Seamless Racerback Sport Bra - Women
// https://cdn.shopify.com/s/files/1/2463/4523/products/ae2b67d5df46a7fcca143f5a50fbd658_360x.jpg?v=1508425129
"Nephrite Fantasy Stella Seamless Racerback Sport Bra - Women": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Nickie High Performance Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_55e9349c-4729-4fc4-b404-482169d8f3d2_360x.jpg?v=1508425296
"Nickie High Performance Leggings": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Oh My Quad T-Shirt
// https://cdn.shopify.com/s/files/1/2463/4523/products/1b16c24049561205fd87765f25d00664_360x.jpg?v=1508425020
"Oh My Quad T-Shirt": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Ok, but First Coffee Ladie's Fitted T-Shirt
// https://cdn.shopify.com/s/files/1/2463/4523/products/7f8a386f5329d69933fea7c509b5fcdb_360x.jpg?v=1508425111
"Ok, but First Coffee Ladie's Fitted T-Shirt": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Organic Pink Street Lion Fleece Hoodie
// https://cdn.shopify.com/s/files/1/2463/4523/products/5e437032e480a7b4b41bb3f2eac79286_360x.jpg?v=1508424976
"Organic Pink Street Lion Fleece Hoodie": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Organic Pink Street Lion Sweater
// https://cdn.shopify.com/s/files/1/2463/4523/products/45ff7f506bddc7136d4b4fee0267c348_360x.jpg?v=1508424973
"Organic Pink Street Lion Sweater": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Paint Printed Athletic Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/ecaecfba0020d59275eecfa91aa01261_360x.jpg?v=1508425214
"Paint Printed Athletic Leggings": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// END OF PAGE 10

// PDX
// https://cdn.shopify.com/s/files/1/2463/4523/products/ee916c3b7a20fae7152323335aa3bf15_360x.jpg?v=1508425008
"PDX": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Pink Propel Funnel Neck Pullover
// https://cdn.shopify.com/s/files/1/2463/4523/products/0d96b36acdab446cd6e2cd82801ff954_360x.jpg?v=1508425086
"Pink Propel Funnel Neck Pullover": {
	"Apparel": ["Turtleneck", "Sweatshirt", "Hoodies"],
	"Color": ["Orchid", "Plum"],
	"Apparel_h": [],
	"Color_h": [],
	"Color_hex": ["#ee50c1", "#e448b8"]
}

// Pink Street Lion T-Shirt
// https://cdn.shopify.com/s/files/1/2463/4523/products/8562aaee0c808bd7bc960b85b7cef8eb_360x.jpg?v=1508425148
"Pink Street Lion T-Shirt": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Pink Vibes Ellie Performance Capri Leggings Summer Yoga Pants - Women
// https://cdn.shopify.com/s/files/1/2463/4523/products/0508a1b765ffc006413923a5c7c5b779_360x.jpg?v=1508425239
"Pink Vibes Ellie Performance Capri Leggings Summer Yoga Pants - Women": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Priya Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_87405b43-6d13-4cd1-8214-41be49e2fb93_360x.jpg?v=1508425328
"Priya Leggings": {
	"Apparel": ["Capris", "Leggings", "Tights"],
	"Color": ["PaleVioletRed"],
	"Apparel_h": [],
	"Color_h": [],
	"Color_hex": ["#c86590", "#33172b"]
}

// RCRP T-Shirt
// https://cdn.shopify.com/s/files/1/2463/4523/products/37646f843f80cf60d013c1e31d107960_360x.jpg?v=1508425145
"RCRP T-Shirt": {
	"Apparel": ["T-Shirt", "Activewear T Shirt"],
	"Color": ["White"],
	"Apparel_h": [],
	"Color_h": [],
	"Color_hex": ["#e0dddf"]
}

// RCRP Tank Top
// https://cdn.shopify.com/s/files/1/2463/4523/products/70fe678927271e4d6fce3ae5d4dcc5e5_360x.jpg?v=1508425151
"RCRP Tank Top": {
	"Apparel": ["Tank Top", "Halter Top"],
	"Color": ["White"],
	"Apparel_h": [],
	"Color_h": [],
	"Color_hex": ["dfded8"]
}

// Saana High Performance Capri
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_63b971f1-d679-43a8-a573-a4bad7ae9cd3_360x.jpg?v=1508425298
"Saana High Performance Capri": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// END OF PAGE 11

// Sapna Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_2981a442-a33d-4078-b57d-e9809538b09e_360x.jpg?v=1508425319
"Sapna Leggings": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Shaanti Yoga Set
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_1a8864b5-8feb-415b-9a66-7d0ee96a6146_360x.jpg?v=1508425335
"Shaanti Yoga Set": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Shalimar Yoga Set
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_da9702e6-5992-499c-bb96-bd298979b328_360x.jpg?v=1508425315
"Shalimar Yoga Set": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Shalini Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_16c847aa-4e52-40fd-a84a-e964574927cb_360x.jpg?v=1508425323
"Shalini Leggings": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Shreya Yoga Set
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_f599e822-52f7-4e62-95e1-a1696c77921c_360x.jpg?v=1508425333
"Shreya Yoga Set": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Siobhan Leggings
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_522dcd24-3016-4359-ac9a-143e56ceb6b6_360x.jpg?v=1508425317
"Siobhan Leggings": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Sita Yoga Top
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_522dcd24-3016-4359-ac9a-143e56ceb6b6_360x.jpg?v=1508425317
"Sita Yoga Top": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Sooki Yoga Set
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_4164b1e3-60fe-4553-9767-52043c0a8abb_360x.jpg?v=1508425330
"Sooki Yoga Set": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// END OF PAGE 12

// Sports Bra Tank
// https://cdn.shopify.com/s/files/1/2463/4523/products/a539ea8c9c462456ba92a8df25679257_a4639a36-5722-4017-a142-fda7ba7f9775_360x.jpg?v=1508425218
"Sports Bra Tank": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Stressed, Blessed and Coffee Obsessed Ladie's Fitted T-shirt
// https://cdn.shopify.com/s/files/1/2463/4523/products/e3f312c4eb8c8a7dabb965af1fcc93eb_360x.jpg?v=1508425114
"Stressed, Blessed and Coffee Obsessed Ladie's Fitted T-shirt": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Tiny but Mighty Ladie's Fitted T-shirt
// https://cdn.shopify.com/s/files/1/2463/4523/products/b8a80b79e31c15b9420172277179de33_360x.jpg?v=1508425117
"Tiny but Mighty Ladie's Fitted T-shirt": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Tropical Dream Ellie Performance Capri Leggings - Women
// https://cdn.shopify.com/s/files/1/2463/4523/products/601e7beea5580386d5f3993bcc1a32fb_360x.jpg?v=1508425131
"Tropical Dream Ellie Performance Capri Leggings - Women": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Tropical Dream Stella Seamless Racerback Sport Bra - Women
// https://cdn.shopify.com/s/files/1/2463/4523/products/fb6a017f72434152278e1e5f0146364c_360x.jpg?v=1508425133
"Tropical Dream Stella Seamless Racerback Sport Bra - Women": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Under The Sea Ellie Performance Capri Leggings Yoga Pants - Women
// https://cdn.shopify.com/s/files/1/2463/4523/products/6ca5c6fb273bd62548a1316eb1b62d7e_360x.jpg?v=1508425235
"Under The Sea Ellie Performance Capri Leggings Yoga Pants - Women": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Under The Sea Stella Printed Seamless Racerback Sport Yoga Bra - Women
// https://cdn.shopify.com/s/files/1/2463/4523/products/07c26a09f821d4a793a88f53a4e8a1e2_360x.jpg?v=1508425242
"Under The Sea Stella Printed Seamless Racerback Sport Yoga Bra - Women": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}

// Verity Running Shorts
// https://cdn.shopify.com/s/files/1/2463/4523/products/1_67621e89-0187-42b4-b089-8e52c7bb4dc3_360x.jpg?v=1508425268
"Verity Running Shorts": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}
// END OF PAGE 13

// Vibrant Galaxy Lucy Printed Performance Leggings - Women
// https://cdn.shopify.com/s/files/1/2463/4523/products/8ad71026c7bc98a25af058e7aeed181f_360x.jpg?v=1508424983
"Vibrant Galaxy Lucy Printed Performance Leggings - Women": {
	"Apparel": [],
	"Color": [],
	"Apparel_h": [],
	"Color_h": []
}
// END OF PAGE 14

}];