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

let getUserData = async (id) => {
  // this method gets detailed user data
};

module.exports = {
  getUserById,
  addUserToDB,
};
