import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { notification } from "antd";
import {
  signInWithGoogle,
  logInWithEmailAndPassword,
} from "../firebase/auth";

import { setUserData,setUser } from "../features/user/userSlice";
import { useSelector, useDispatch } from 'react-redux';

import "../assets/styles/common.scss";

// type NotificationType = 'success' | 'info' | 'warning' | 'error';

const Signin = () => {

  const user = useSelector((state)=>state.user);

  const [api, contextHolder] = notification.useNotification();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const authRegistration = async () => {
    const response = await signInWithGoogle();

    if (response) {
      dispatch(setUser());
      dispatch(setUserData(response));
      openNotificationWithIcon("success", "Sign in successfull!");
      Navigate("/");
    }
  };

  const handleSubmit = async (e)=>{

    e.preventDefault();

    let {email,password} = e.target;

    email = email.value;
    password = password.value;

    console.log(email,password)

    if(!email || !password) {
      openNotificationWithIcon("error","Please Enter All Credentials");
      return;
    }

    const response = await logInWithEmailAndPassword(email,password);

    if(response) {
      dispatch(setUser());
      dispatch(setUserData(response));
      openNotificationWithIcon("success","Sign in successfull!");
      Navigate("/");
    } else {
      openNotificationWithIcon("error","Email Already in use");
    }

    e.target.password.value = "";
    e.target.email.value = "";

  }

  return (
    <div className="sign">
      {contextHolder}
      <h1>SIGN IN</h1>

      <div className="formSection">
        <form onSubmit={handleSubmit}>
          <label >EMAIL</label>
          <input name="email" type="email" />

          <label >PASSWORD</label>
          <input name="password" type="password" />

          <button>SIGN IN</button>
        </form>

        <Link to="/signup">
          <p>Create account</p>
        </Link>

        <button className="authButton" onClick={authRegistration}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
            alt="#"
          />
          <p>Sign in with Google</p>
        </button>
      </div>
    </div>
  );
};

export default Signin;
