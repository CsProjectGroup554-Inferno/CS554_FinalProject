const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const validate = require("../validation/validate");

let getUserById = async (id) => {
  validate.checkString(id);
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: id });
  return user;
};

let addUserToDB = async (user) => {
  validate.checkString(user.uid);
  validate.checkString(user.email);

  const userCollection = await users();
  const newUser = {
    _id: user.uid,
    email: user.email,
    properties: [],
    favorites: [],
  };
  const newInsertInfo = await userCollection.insertOne(newUser);
  if (newInsertInfo.aknowledged === false) {
    throw "Could not add user";
  }
  const newId = newInsertInfo.insertedId;
  const userData = await getUserById(newId);
  return userData;
};

// let getUserData = async (id) => {
//   // this method gets detailed user data
// };

let getFavoritesList = async (id) => {
  // this method gets the list of favorites for a user
  validate.checkString(id);
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: id });
  return user.favorites;
};

let addFavorite = async (id, propertyId) => {
  // this method adds a property to the user's favorites list
  validate.checkString(id);
  validate.checkString(propertyId);
  const userCollection = await users();
  const user = await userCollection.updateOne({ _id: id }, { $push: { favorites: propertyId } });
  if (user.modifiedCount === 0) {
    throw "Could not add property to favorites";
  }
  const userData = await getUserById(id);
  return userData;
};

let removeFavorite = async (id, propertyId) => {
  // this method removes a property from the user's favorites list
  validate.checkString(id);
  validate.checkString(propertyId);
  const userCollection = await users();
  const user = await userCollection.updateOne({ _id: id }, { $pull: { favorites: propertyId } });
  if (user.modifiedCount === 0) {
    throw "Could not remove property from favorites";
  }
  const userData = await getUserById(id);
  return userData;
};

module.exports = {
  getUserById,
  addUserToDB,
  getFavoritesList,
  addFavorite,
  removeFavorite,
};
