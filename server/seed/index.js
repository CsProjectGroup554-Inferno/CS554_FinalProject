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
  price: "2,500",
  bedrooms: "1",
  bathrooms: "1",
  size: "1,000",
  address: "16th St, Jersey City, NJ 07310",
  zipcode: "07310",
  images: [],
};

addDataToDatabase(property1, user1);
