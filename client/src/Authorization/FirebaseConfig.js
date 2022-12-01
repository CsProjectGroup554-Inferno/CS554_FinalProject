// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0OC2r9y0K-CSXD94mP_OHwe-vmOr6J4o",
  authDomain: "njrental-26c0a.firebaseapp.com",
  projectId: "njrental-26c0a",
  storageBucket: "njrental-26c0a.appspot.com",
  messagingSenderId: "1024410376363",
  appId: "1:1024410376363:web:563e8ed22e80352d94bfee",
  measurementId: "G-00889K7JY1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const emailProvider = new EmailAuthProvider();
export { auth, googleProvider, emailProvider };
