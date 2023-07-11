// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPY3f-FW6C3NG9VQeQtKKVjmzXFOGhHp0",
  authDomain: "e-commerce-d122a.firebaseapp.com",
  projectId: "e-commerce-d122a",
  storageBucket: "e-commerce-d122a.appspot.com",
  messagingSenderId: "750848149040",
  appId: "1:750848149040:web:40a2eccd8715ada66dcff5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export {
    app,
    auth,
    db,
    googleProvider,
}