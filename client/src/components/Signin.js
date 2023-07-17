import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { notification } from "antd";
import { signInWithGoogle, logInWithEmailAndPassword } from "../firebase/auth";
import { setUserData, setUser } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

import "../assets/styles/common.scss";

// type NotificationType = 'success' | 'info' | 'warning' | 'error';

const Signin = () => {
  const user = useSelector((state) => state.user);

  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const authRegistration = async () => {
    const response = await signInWithGoogle();
    if (response?.status === 201) {
      openNotificationWithIcon("success", "Sign in successful!");

      setTimeout(() => {
        dispatch(setUser());
        dispatch(setUserData(response.data));
      }, 1000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { USERID, password } = e.target;

    USERID = USERID.value;
    password = password.value;

    let email = "NA";
    let phone = "NA";

    if (!USERID || !password) {
      openNotificationWithIcon("error", "Please Enter All Credentials");
      return;
    }

    const isNumber = /^[0-9]+$/.test(USERID);
    const isValidEmail = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(
      USERID
    );

    if (isNumber && USERID.length === 10) {
      // Email is a 10-digit number
      // Continue with the desired logic
      console.log("Email is a 10-digit number");
      phone = USERID;
    } else if (isValidEmail) {
      // Email is in a valid format
      // Continue with the desired logic
      console.log("Email is in a valid format");
      email = USERID;
    } else {
      // Email is not in a valid format
      openNotificationWithIcon("error", "Please enter a valid email address");
      return;
    }

    try {
      const response = await logInWithEmailAndPassword(email, phone, password);

      if (response.status === 201) {
        openNotificationWithIcon("success", "Sign in successfull!");
  
        setTimeout(() => {
          dispatch(setUser());
          dispatch(setUserData(response.data));
        }, 1000);
      } else if(response.status === 204) {
        openNotificationWithIcon("error", "Account is disabled, please contact admin");
      } else {
        openNotificationWithIcon("error", "User not found");
      }

    } catch(err) {
      console.log(err);
    }
    

    e.target.password.value = "";
    e.target.USERID.value = "";
  };

  const handleChange = (event) => {
    let val = event.target.value;
    const isNumber = /^[0-9]+$/.test(val);

    if (isNumber && val.length > 10) {
      val = val.slice(0, 10);
    }

    setValue(val);
  };

  return (
    <div className="sign">
      {contextHolder}
      <h1>SIGN IN</h1>

      <div className="formSection">
        <form onSubmit={handleSubmit}>
          <label>EMAIL OR PHONE NUMBER</label>
          <input
            name="USERID"
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleChange}
          />

          <label>PASSWORD</label>
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
