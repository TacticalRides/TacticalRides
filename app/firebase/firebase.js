// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRXmTmXUR1bLd2Q1iG9YEMeOmgo4AuuE0",
  authDomain: "tactical-rides.firebaseapp.com",
  projectId: "tactical-rides",
  storageBucket: "tactical-rides.firebasestorage.app",
  messagingSenderId: "873553346185",
  appId: "1:873553346185:web:4d507e5e69189d54c35058",
  measurementId: "G-H9K2EVJ62M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);