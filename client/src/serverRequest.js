import axios from "axios";
import { auth, emailProvider } from "./Authorization/FirebaseConfig";
import validate from "./validation";
const BASE_URL = "http://localhost:4000";

let getUserById = async (id) => {
  const token = await auth.currentUser.getIdToken();
  let response = await axios.get(BASE_URL + "/users/" + id, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

let changePassword = async (oldPassword, newPassword, confirmPassword) => {
  // implmentation pending
  await validate.password(oldPassword);
  await validate.password(newPassword);
  await validate.password(confirmPassword);
  await validate.passwordsMatch(newPassword, confirmPassword);
  let credential = emailProvider.credential(auth.currentUser.email, oldPassword);
  await auth.currentUser.reauthenticateWithCredential(credential);
  await auth.currentUser.updatePassword(newPassword);
};

let getUser = async (user) => {
  try {
    const token = await auth.currentUser.getIdToken();
    let response = await axios.get(BASE_URL + "/users/", {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

let getAllProperty = async (filter, sort) => {
  // if (!page) {
  //   page = 1;
  // }

  let response;

  if (filter !== "null" && sort !== "null") {
    response = await axios.get(BASE_URL + "/properties/?filter=" + filter + "&sort=" + sort);
  } else if ((filter !== "null" && sort === "null") || (filter !== "null" && !sort)) {
    response = await axios.get(BASE_URL + "/properties/?filter=" + filter);
  } else if ((filter === "null" && sort !== "null") || (sort !== "null" && !filter)) {
    response = await axios.get(BASE_URL + "/properties/?sort=" + sort)
  } else {
    response = await axios.get(BASE_URL + "/properties")
  }

  console.log(response)
  return response.data;
};

let getPropertyById = async (id) => {
  let response = await axios.get(BASE_URL + "/properties/" + id);
  return response.data;
};

let addProperty = async (property, userId) => {
  const token = await auth.currentUser.getIdToken();

  const { title, description, city, price, bedrooms, bathrooms, size, address, zipcode, images } = property
  const data = {
    title: title,
    description: description,
    city: city,
    price: price,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    size: size,
    address: address,
    zipcode: zipcode,
    images: images,
    owner: userId,
  }

  let response = await axios.post(BASE_URL + "/properties/", data, { headers: { Authorization: token } })
  return response.data;
};

let updateProperty = async (id, user, property) => {
  let token;
  try {
    token = await user.getIdToken(true)
  } catch (e) {
    throw e
    // throw Error("fail getting usertoken")
  }

  const { title, description, city, price, zipcode, bedrooms, bathrooms, size, address, newImages, removedImages } = property;
  
  const data = {
    title: title,
    description: description,
    city: city,
    price: price,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    size: size,
    address: address,
    zipcode: zipcode,
    newImages: newImages,
    removedImages: removedImages
  }


  let response = await axios.put(BASE_URL + "/properties/" + id, data, { headers: { 'Authorization': token } })
  return response.data
};

let deleteProperty = async (id, user) => {
  let token;
  try {
    token = await user.getIdToken(true)
  } catch (e) {
    throw e
  }

  let response = await axios.delete(BASE_URL + "/properties/" + id, { headers: { 'Authorization': token } })
  return response.data;
};

let exports = {
  getUserById,
  changePassword,
  getUser,
  deleteProperty,
  getAllProperty,
  getPropertyById,
  addProperty,
  updateProperty,
};

export default exports;
