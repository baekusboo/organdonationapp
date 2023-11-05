import { getDatabase } from "firebase/database"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiwvNF_nwx5KNKRSKqH7Vub8hJJOhL-B0",
  authDomain: "organ-donation-app-4cc11.firebaseapp.com",
  databaseURL: "https://organ-donation-app-4cc11-default-rtdb.firebaseio.com",
  projectId: "organ-donation-app-4cc11",
  storageBucket: "organ-donation-app-4cc11.appspot.com",
  messagingSenderId: "135923170899",
  appId: "1:135923170899:web:d198701123c1bb567c50a6",
  measurementId: "G-LBFJSVJE5Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
