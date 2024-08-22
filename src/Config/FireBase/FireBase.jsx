import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// import { getFirestore } from "firebase/firestore";

//apny app ki config yha add krain just  

const firebaseConfig = {
    apiKey: "AIzaSyBVH5OHbU6aHxAwa03uWaXqkW2lBmwKFSs",
    authDomain: "data-entry-model-by-mr-haji.firebaseapp.com",
    databaseURL: "https://data-entry-model-by-mr-haji-default-rtdb.firebaseio.com",
    projectId: "data-entry-model-by-mr-haji",
    storageBucket: "data-entry-model-by-mr-haji.appspot.com",
    messagingSenderId: "622379130841",
    appId: "1:622379130841:web:38525893fed746fab283c8",
    measurementId: "G-2LZS637L6K"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const AUTH = getAuth(app);
const DB = getDatabase(app);
// const DB = getFirestore(app);
export { DB, AUTH };