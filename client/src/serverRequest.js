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

let deleteProperty = async (id, user) => {
  try {
    const token = await auth.currentUser.getIdToken();
    let response = await axios.delete(BASE_URL + "/properties/" + id, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

let getPropertiesByCity = async (city) => {
  try {
    const token = await auth.currentUser.getIdToken();
    let response = await axios.get(BASE_URL + "/properties/city?city=" + city, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

let exports = {
  getUserById,
  changePassword,
  getUser,
  deleteProperty,
  getPropertiesByCity,
};

export default exports;
