const mongoCollections = require("../config/mongoCollections");
const properties = mongoCollections.properties;
const users = mongoCollections.users;
const validate = require("../validation/validate");
const { ObjectId } = require("mongodb");

let getAllProperty = async () => {
  const propertyCollection = await properties();
  const property = await propertyCollection.find({}).toArray();
  if (!property) throw "Property not found in DB";
  // convert all _id to string
  for (let i = 0; i < property.length; i++) {
    property[i]._id = property[i]._id.toString();
  }
  return property;
};

let getPropertiesByCity = async (city) => {
  // validate.checkString(city);
  const propertyCollection = await properties();
  const property = await propertyCollection.find({ city: city }).toArray();

  if (!property) throw "Property not found in this city";
  // convert all _id to string
  for (let i = 0; i < property.length; i++) {
    property[i]._id = property[i]._id.toString();
  }
  return property;
};

let getPropertyById = async (id) => {
  // validate.checkString(id);
  const propertyCollection = await properties();
  const property = await propertyCollection.findOne({ _id: id });
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
    images: property.images,
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

let updatePropertyInDB = async (id, property) => {
  // validate.checkString(id);
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

  const propertyCollection = await properties();
  const updatedProperty = {
    title: property.title,
    description: property.description,
    city: property.city,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    size: property.size,
    address: property.address,
    zipcode: property.zipcode,
    images: property.images,
  };
  const updatedInfo = await propertyCollection.updateOne({ _id: ObjectId(id) }, { $set: updatedProperty });
  if (updatedInfo.modifiedCount === 0) {
    throw "Could not update property successfully";
  }
  return await getPropertyById(id);
};

let deletePropertyFromDB = async (id) => {
  validate.checkString(id);
  const propertyCollection = await properties();
  const deleteInfo = await propertyCollection.deleteOne({ _id: ObjectId(id) });
  if (deleteInfo.deletedCount === 0) {
    throw `Could not delete property with id of ${id}`;
  }
  return true;
};

module.exports = {
  getAllProperty,
  getPropertiesByCity,
  getPropertyById,
  addPropertyToDB,
  updatePropertyInDB,
  deletePropertyFromDB,
};
