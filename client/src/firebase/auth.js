import { auth, googleProvider, db } from "./firebase";
import axios from "axios";

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

const signInWithGoogle = async (role) => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    console.log(user);

    const data = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      password: "123",
      imgUrl: user.photoURL,
      role: role,
      authProvider: "Google",
    };

    const response = await axios.post(
      "http://localhost:8000/user/sign-up",
      data
    );

    if (response.status === 201) {
      return response.data;
    } else {
      return;
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// MANUAL SIGN IN AND ADDING USER TO DATABASE WITH QUERY AND ADDDOCS
const logInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;

    console.log("level2")

    const data = {
      uid: user.uid,
      email: email,
      password:password,
      authProvider: "Manual",
    };

    const response = await axios.post(
      "http://localhost:8000/user/sign-in",
      data
    );

    console.log("hello",response.data);

    if (response.status === 201) {
      return response.data;
    } else {
      return;
    }

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// MANUAL SIGN UP AND ADDING USER TO DATABASE WITH QUERY AND ADDDOCS
const registerWithEmailAndPassword = async (name, email, password, role) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    let user = res.user;
    await updateProfile(user, { displayName: name });

    const data = {
      uid: user.uid,
      name: name,
      email: email,
      password: password,
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1200px-Missing_avatar.svg.png",
      role: role,
      authProvider: "Manual",
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
