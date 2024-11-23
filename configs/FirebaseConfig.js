// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAygIOCdoTfBl-rTKE3ctKpd11PDvnpOIQ",
  authDomain: "travel-app-731ae.firebaseapp.com",
  projectId: "travel-app-731ae",
  storageBucket: "travel-app-731ae.appspot.com",
  messagingSenderId: "30832829227",
  appId: "1:30832829227:web:5e110064795ed3f1169b6e",
  measurementId: "G-YFN9DDR5EE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
