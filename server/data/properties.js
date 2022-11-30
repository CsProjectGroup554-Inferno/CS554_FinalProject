const mongoCollections = require("../config/mongoCollections");
const properties = mongoCollections.properties;
const validate = require("../validation/validate");
const { ObjectId } = require("mongodb");

let getAllProperty = async()=>{

;}

let getPropertyById = async (id) => {
  validate.checkString(id);
  const propertyCollection = await properties();
  const property = await propertyCollection.findOne({ _id: id });
  return property;
};

let addPropertyToDB = async (property, userId) => {
  validate.checkString(property.title);
  validate.checkString(property.description);
  validate.checkString(property.city);
  validate.checkString(property.price);
  validate.checkString(property.bedrooms);
  validate.checkString(property.bathrooms);
  validate.checkString(property.size);
  validate.checkString(property.address);
  validate.checkString(property.zipcode);
  validate.checkString(property.images);
  validate.checkString(userId);

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
  const propertyData = await getPropertyById(newId);
  return propertyData;
};

let updateProperty = async(id, propertyUpdateInfo)=>{

};

let deleteProperty = async(id, ownerId)=>{

};

module.exports = {
  getAllProperty,
  getPropertyById,
  addPropertyToDB,
  updateProperty,
  deleteProperty
};
