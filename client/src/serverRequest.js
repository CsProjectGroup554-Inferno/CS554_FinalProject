import axios from "axios";
import { auth } from "./Authorization/FirebaseConfig";
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

let exports = {
  getUserById,
};

export default exports;
