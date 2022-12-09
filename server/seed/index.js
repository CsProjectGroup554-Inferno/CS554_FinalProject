const dbConnection = require("../config/mongoConnection");
const data = require("../data");
const users = data.users;
const properties = data.properties;
const images = data.images;

let addDataToDatabase = async (property, user) => {
  try {
    const db = dbConnection.connectToDb();
    // sampleImages = ["1.png", "2.png", "3.png", "4.png"];
    sampleImages = ["1.png"];
    let imageList = [];
    for (let i = 0; i < sampleImages.length; i++) {
      imageList.push(await images.createGridFS("./public/property_2/" + sampleImages[i], "property_2", sampleImages[i]));
    }
    property.images = imageList;
    users.addUserToDB(user);
    let newProperty = await properties.addPropertyToDB(property, user.uid);
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

addDataToDatabase(property1, user1);
addDataToDatabase(property2, user1);
addDataToDatabase(property3, user1);
addDataToDatabase(property4, user1);
addDataToDatabase(property5, user1);
addDataToDatabase(property6, user1);


