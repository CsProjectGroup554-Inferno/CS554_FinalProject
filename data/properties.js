const mongoCollections = require("../config/mongoCollections");
const properties = mongoCollections.properties;
const users = mongoCollections.users;
const validate = require("../validation/validate");
const { ObjectId } = require("mongodb");
// const xss = require("xss");

let getAllProperty = async (page, filter, sort) => {
  // validate.checkPage(page);
  //sort
  if (sort && sort === "priceUp") {
    sort = { price: 1 };
  } else if (sort && sort === "priceDown") {
    sort = { price: -1 };
  } else {
    sort = {};
  }

  if(!page){
    page=1
  }
  // console.log(page, filter);
  //filter
  validate.checkPage(page);
  const propertyCollection = await properties();
  const propertyCity = await propertyCollection.findOne({ city: filter });
  // console.log(propertyCity);
  if (filter && filter === "price1") {
    filter = { price: { $lt: 1000 } };
  } else if (filter && filter === "price2") {
    filter = { price: { $lt: 2000, $gt: 1000 } };
  } else if (filter && filter === "price3") {
    filter = { price: { $gte: 2000 } };
  } else if (filter && filter === "1") {
    filter = { bedrooms: { $eq: 1 } };
  } else if (filter && filter === "2") {
    filter = { bedrooms: { $eq: 2 } };
  } else if (filter && filter === "3") {
    filter = { bedrooms: { $eq: 3 } };
  } else if (filter && filter === "4") {
    filter = { bedrooms: { $eq: 4 } };
  } else if (filter && filter === "size1") {
    filter = { size: { $lt: 1000 } };
  } else if (filter && filter === "size2") {
    filter = { size: { $lt: 2000, $gte: 1000 } };
  } else if (filter && filter === "size3") {
    filter = { size: { $gte: 2000 } };
  } else if (propertyCity) {
    filter = { city: filter };
  } else {
    filter = {};
  }

  // console.log(filter);
  //get propert after filter and sort
  var allProperty = await propertyCollection.find(filter).sort(sort).toArray();
  var allPropertyCity = await propertyCollection.find({}).sort({}).toArray();


  allPropertyCity[0].cities = []
  for(let i=0;i<allPropertyCity.length;i++){
    allPropertyCity[0].cities.push(allPropertyCity[i].city)
  }

  allPropertyCity[0].cities= allPropertyCity[0].cities.filter((item, 
    index) => allPropertyCity[0].cities.indexOf(item) === index);

  for(let i=0;i<allProperty.length;i++){
    allProperty[i].cities = []
    allProperty[i].cities= allPropertyCity[0].cities
  }




  console.log(allProperty[0].cities[0])
  if (!allProperty) {
    throw "Property not found in data base";
  }
  let take = 3;

  let data = {
    properties: null,
    next: false,
    prev: false,
  };

  if (allProperty.length - page * take > 0) {
    data.next = true;
  }

  if (allProperty.length > take && page > 1) {
    data.prev = true;
  }

  allProperty = allProperty.slice((page - 1) * take);
  allProperty = allProperty.slice(0, take);

  // convert all _id to string
  for (let i = 0; i < allProperty.length; i++) {
    allProperty[i]._id = allProperty[i]._id.toString();
  }
  data.properties = allProperty;

  // console.log(data);
  return data;
};

//remove code later filter with city preset above
// let getPropertiesByCity = async (city) => {
//   // validate.checkString(city);
//   const propertyCollection = await properties();
//   const property = await propertyCollection.find({ city: city }).toArray();

//   if (!property) throw "Property not found in this city";
//   // convert all _id to string
//   for (let i = 0; i < property.length; i++) {
//     property[i]._id = property[i]._id.toString();
//   }
//   return property;
// };

let getPropertyById = async (id) => {
  // validate.checkString(id);
  const propertyCollection = await properties();
  // console.log(id);
  const property = await propertyCollection.findOne({ _id: ObjectId(id) });
  // console.log(property);
  if (!property) throw "Property not found for this id";
  property._id = property._id.toString();
  return property;
};

let addPropertyToDB = async (property, userId) => {
  // validate.checkString(property.title);
  // validate.checkString(property.description);
  // validate.checkString(property.city);
  // validate.checkString(property.price);
  // validate.checkString(property.bedrooms);
  // validate.checkString(property.bathrooms);
  // validate.checkString(property.size);
  // validate.checkString(property.address);
  // validate.checkString(property.zipcode);
  // validate.checkString(property.images);
  // validate.checkString(userId);

  const propertyCollection = await properties();
  const newProperty = {
    _id: new ObjectId(),
    title: property.title,
    description: property.description,
    city: property.city,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    size: property.size,
    address: property.address,
    zipcode: property.zipcode,
    images: property.images ? property.images : [],
    owner: userId,
  };
  const newInsertInfo = await propertyCollection.insertOne(newProperty);
  if (newInsertInfo.aknowledged === false) {
    throw "Could not add property";
  }
  const newId = newInsertInfo.insertedId;
  const userCollection = await users();
  const user = await userCollection.updateOne({ _id: userId }, { $push: { properties: newId } });
  if (user.modifiedCount === 0) {
    throw "Could not add property to user";
  }
  const propertyData = await getPropertyById(newId);
  return propertyData;
};

let updatePropertyInDB = async (id, propertyUpdateInfo) => {
  validate.checkId(id);
  id = id.toString();
  // validate.checkPropertyInfo(propertyUpdateInfo);
  const objId = ObjectId.createFromHexString(id);

  let data = {
    title: propertyUpdateInfo.title,
    description: propertyUpdateInfo.description,
    city: propertyUpdateInfo.city,
    price: propertyUpdateInfo.price,
    bedrooms: propertyUpdateInfo.bedrooms,
    bathrooms: propertyUpdateInfo.bathrooms,
    size: propertyUpdateInfo.size,
    address: propertyUpdateInfo.address,
    zipcode: propertyUpdateInfo.zipcode,
    images: propertyUpdateInfo.images,
  };

  const propertyCollection = await properties();
  const updatePropertyInfo = await propertyCollection.updateOne({ _id: objId }, { $set: data });
  if (updatePropertyInfo.modifiedCount === 0) {
    throw "Update property has failed";
  }

  return await this.getPropertyById(id);
};

let deletePropertyFromDB = async (id, ownerId) => {
  validate.checkId(id);
  const idObj = ObjectId.createFromHexString(id);

  // delete property
  const propertyCollection = await properties();
  const deletionInfo = await propertyCollection.deleteOne({ _id: idObj });
  if (deletionInfo.deletedCount === 0) {
    throw "Cpuld not delete property";
  }

  // delete from favorite
  const userCollection = await users();
  await userCollection.updateMany({}, { $pull: { favorite: id } });

  // delete from owner's property list
  const updateInfo = await userCollection.updateOne({ _id: ownerId }, { $pull: { property: idObj } });
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
    throw "Could not delete property";
  }

  const res = {
    deleted: true,
  };

  return res;
};

module.exports = {
  getAllProperty,
  getPropertyById,
  addPropertyToDB,
  updatePropertyInDB,
  deletePropertyFromDB,
};
