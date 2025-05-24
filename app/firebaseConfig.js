// /app/firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRXmTmXUR1bLd2Q1iG9YEMeOmgo4AuuE0",
  authDomain: "tactical-rides.firebaseapp.com",
  projectId: "tactical-rides",
  storageBucket: "tactical-rides.appspot.com", // ✅ corrected
  messagingSenderId: "873553346185",
  appId: "1:873553346185:web:4d507e5e69189d54c35058",
  measurementId: "G-H9K2EVJ62M",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
