const dbConnection = require("../config/mongoConnection");
const data = require("../data");
const users = data.users;
const properties = data.properties;
const images = data.images;

// drop database
let dropDatabase = async () => {
  try {
    const db = dbConnection.connectToDb();
    await db.dropDatabase();
  } catch (e) {
    console.log(e);
  }
};

dropDatabase();

let addDataToDatabase = async (property, user, albumName, sampleImages) => {
  try {
    const db = dbConnection.connectToDb();
    // sampleImages = ["1.png", "2.png", "3.png", "4.png"];
    let imageList = [];
    for (let i = 0; i < sampleImages.length; i++) {
      imageList.push(await images.createGridFS("./public/" + albumName + "/" + sampleImages[i], albumName, sampleImages[i]));
    }
    property.images = imageList;
    let newProperty = await properties.addPropertyToDB(property, user.uid);
    console.log(newProperty);
  } catch (e) {
    console.log(e);
  }
};

let user1 = {
  uid: "m9NbN9HPVGNKQnIVLUMWv1P6DL13",
  email: "staremp1@gmail.com",
};
let property1 = {
  title: "16th St, Jersey City, NJ 07310 - 1 BR 1 BA Condo",
  description: "Large residences equipped with 10' High Ceilings, sound insulating glass, centralized heating and cooling, European White Oak Flooring, Washer and Dryer.",
  city: "Jersey City",
  price: 700,
  bedrooms: 1,
  bathrooms: 1,
  size: 560,
  address: "16th St, Jersey City, NJ 07310",
  zipcode: "07310",
  images: [],
};

let property2 = {
  title: "16th St, Jersey City, NJ 07310 - 1 BR 1 BA Condo",
  description: "Large residences equipped with 10' High Ceilings, sound insulating glass, centralized heating and cooling, European White Oak Flooring, Washer and Dryer.",
  city: "Trenton",
  price: 1200,
  bedrooms: 2,
  bathrooms: 1,
  size: 750,
  address: "16th St, Jersey City, NJ 07310",
  zipcode: "07310",
  images: [],
};

let property3 = {
  title: "16th St, Jersey City, NJ 07310 - 1 BR 1 BA Condo",
  description: "Large residences equipped with 10' High Ceilings, sound insulating glass, centralized heating and cooling, European White Oak Flooring, Washer and Dryer.",
  city: "Newark",
  price: 2000,
  bedrooms: 3,
  bathrooms: 1,
  size: 1300,
  address: "16th St, Jersey City, NJ 07310",
  zipcode: "07310",
  images: [],
};

let property4 = {
  title: "16th St, Jersey City, NJ 07310 - 1 BR 1 BA Condo",
  description: "Large residences equipped with 10' High Ceilings, sound insulating glass, centralized heating and cooling, European White Oak Flooring, Washer and Dryer.",
  city: "Hoboken",
  price: 2900,
  bedrooms: 4,
  bathrooms: 1,
  size: 2870,
  address: "16th St, Jersey City, NJ 07310",
  zipcode: "07310",
  images: [],
};

let property5 = {
  title: "16th St, Jersey City, NJ 07310 - 1 BR 1 BA Condo",
  description: "Large residences equipped with 10' High Ceilings, sound insulating glass, centralized heating and cooling, European White Oak Flooring, Washer and Dryer.",
  city: "Paterson",
  price: 900,
  bedrooms: 1,
  bathrooms: 1,
  size: 475,
  address: "16th St, Jersey City, NJ 07310",
  zipcode: "07310",
  images: [],
};

let property6 = {
  title: "16th St, Jersey City, NJ 07310 - 1 BR 1 BA Condo",
  description: "Large residences equipped with 10' High Ceilings, sound insulating glass, centralized heating and cooling, European White Oak Flooring, Washer and Dryer.",
  city: "Paterson",
  price: 1500,
  bedrooms: 2,
  bathrooms: 1,
  size: 1075,
  address: "16th St, Jersey City, NJ 07310",
  zipcode: "07310",
  images: [],
};

// add user1 to database
try {
  users.addUserToDB(user1);
} catch (e) {
  console.log(e);
}

// add property to database for user1
addDataToDatabase(property1, user1, "property_1", ["1.png", "2.png", "3.png", "4.png"]);
addDataToDatabase(property2, user1, "property_2", ["1.png"]);

let user2 = {
  uid: "m9NbN9HPVGNKQnIVLUMWv1P6DL14",
  email: "staremp2@gmail.com",
};

// add user2 to database
try {
  users.addUserToDB(user2);
} catch (e) {
  console.log(e);
}

// add property to database for user2
// addDataToDatabase(property3, user2, "property_3", ["1.png", "2.png", "3.png", "4.png"]);
// so on, but make sure the images that we are about add are in public folder
