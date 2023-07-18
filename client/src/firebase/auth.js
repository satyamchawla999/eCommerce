import { auth, googleProvider, db } from "./firebase";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
  updateDoc,
} from "firebase/firestore";

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    const data = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      phone: "NA",
      password: "NA",
      imgUrl: ["NA","NA"],
      role:"0",
      authProvider: "Google",
      gNo:"NA",
      bName:"NA",
      bType:"NA",
    };

    const response = await axios.post(
      "http://localhost:8000/user/sign-up",
      data
    );

    if (response.status === 201) {
      return response;
    } else {
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

// MANUAL SIGN IN AND ADDING USER TO DATABASE WITH QUERY AND ADDDOCS
const logInWithEmailAndPassword = async (email, phone, password) => {
  try {
    
    const data = {
      email: email,
      phone: phone,
      password: password,
      authProvider: "Manual",
    };

    const response = await axios.post(
      "http://localhost:8000/user/sign-in",
      data
    );

    return response;

  } catch (err) {
    console.error(err);
    return {status:409}
  }
};

// MANUAL SIGN UP AND ADDING USER TO DATABASE WITH QUERY AND ADDDOCS
const registerWithEmailAndPassword = async (name, email, phone, password, role) => {
  try {
    let data = {};
    let res = {};
    let user = {};

    if(email !== "NA") {
      res = await createUserWithEmailAndPassword(auth, email, password);
      user = res.user;
      await updateProfile(user, { displayName: name });
    } else {
      const uniqueId = uuidv4();
      user["uid"] = uniqueId;
    }

    data = {
      uid: user.uid,
      name: name,
      email: email,
      phone: phone,
      password: password,
      imgUrl: ["NA","NA"],
      role: role,
      authProvider: "Manual",
      gNo:"NA",
      bName:"NA",
      bType:"NA",
    };

    const response = await axios.post(
      "http://localhost:8000/user/sign-up",
      data
    );

    if (response.status === 201) {
      return data;
    } else {
      return;
    }
  } catch (err) {
    console.error(err);
    
  }
};

// LOGOUT AND SET ONLINE TO FALSE IN FIRESTORE DATABASE
const logout = async () => {
  signOut(auth);
};

export {
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
