// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref as dbref, set as dbset, get as dbget, onValue as dbOnValue } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBsLWZeQDwtpPMLwrUIDzwFSgfOSNlgWoY",
    authDomain: "surfspace-0.firebaseapp.com",
    projectId: "surfspace-0",
    storageBucket: "surfspace-0.appspot.com",
    messagingSenderId: "1013267828045",
    appId: "1:1013267828045:web:02ca6565d6313801a5fb04",
    measurementId: "G-J64QKXGVNQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);


export { database, dbref, dbset, dbget, dbOnValue, analytics, auth };