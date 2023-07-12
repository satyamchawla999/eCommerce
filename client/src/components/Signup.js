import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { notification, Radio } from "antd";
import {
  signInWithGoogle,
  registerWithEmailAndPassword,
} from "../firebase/auth";

import { setUserData,setUser } from "../features/user/userSlice";
import { useSelector,useDispatch } from "react-redux";

import "../assets/styles/common.scss";

// type NotificationType = 'success' | 'info' | 'warning' | 'error';

const Signup = () => {

  const user = useSelector((state) => state.user);

  const [role, setRole] = useState(0);
  const [api, contextHolder] = notification.useNotification();
  const Navigate = useNavigate();
  const dispatch = useDispatch();


  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };



  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setRole(e.target.value);
  };


  const authRegistration = async () => {
    if (role === 0) {
      openNotificationWithIcon("error", "Please choose role");
      return;
    }

    const response = await signInWithGoogle(role);

    if (response) {
      dispatch(setUser());
      dispatch(setUserData(response));
      Navigate("/");
      return openNotificationWithIcon("success", "Sign in successfull!");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    let { name, email, password } = e.target;
    name = name.value;
    email = email.value;
    password = password.value;

    if (role === 0) {
      openNotificationWithIcon("error", "Please choose role");
      return;
    }

    if (!name || !email || !password) {
      openNotificationWithIcon("error", "Please Enter All Credentials");
      return;
    }

    const response = await registerWithEmailAndPassword(
      name,
      email,
      password,
      role
    );

    if (response) {
      dispatch(setUser());
      dispatch(setUserData(response));
      openNotificationWithIcon("success", "Sign in successfull!");
      Navigate("/");
    } else {
      openNotificationWithIcon("error", "Email Already in use");
    }

    e.target.name.value = "";
    e.target.password.value = "";
    e.target.email.value = "";
  };

  return (
    <div className="sign">
      {contextHolder}

      <h1>CREATE ACCOUNT</h1>

      <div className="formSection">
        <form onSubmit={handleSubmit}>
          <label>NAME</label>
          <input name="name" type="text" />

          <label>EMAIL</label>
          <input name="email" type="email" />

          <label>PASSWORD</label>
          <input name="password" type="password" />

          <Radio.Group
            className="radio"
            name="role"
            onChange={onChange}
            value={role}
          >
            <Radio value={"Customer"}>Customer</Radio>
            <Radio value={"Vendor"}>Vendor</Radio>
          </Radio.Group>

          <button>SIGN UP</button>
        </form>

        <p>
          Already have an account? <Link to="signin">Sign in</Link>
        </p>

        <button
          className="authButton"
          onClick={authRegistration}
        >
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

export default Signup;
