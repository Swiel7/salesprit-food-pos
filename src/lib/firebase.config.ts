import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCv_PIvYaQ07ziK7o3CsvRGfCh9u9suySI",
  authDomain: "food-order-app-b8370.firebaseapp.com",
  projectId: "food-order-app-b8370",
  storageBucket: "food-order-app-b8370.appspot.com",
  messagingSenderId: "689806652447",
  appId: "1:689806652447:web:0c99ccaaac0e9384a7112a",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
