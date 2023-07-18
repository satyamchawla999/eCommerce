import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notification, Radio } from "antd";
import {
  signInWithGoogle,
  registerWithEmailAndPassword,
} from "../firebase/auth";
import { setUserData, setUser } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import "../assets/styles/common.scss";

const Signup = () => {
  const user = useSelector((state) => state.user);
  const [role, setRole] = useState("0");
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const [api, contextHolder] = notification.useNotification();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [buttonDisable,setButtonDisable] = useState(false);

  const openNotificationWithIcon = (type, message) => {
    api[type]({ message: message });
  };

  const radioChange = (e) => {
    setRole(e.target.value);
  };

  const authRegistration = async () => {
    try {
      const response = await signInWithGoogle();
      if (response?.status === 201) {
        openNotificationWithIcon("success", "Sign in successful!");
  
        setTimeout(() => {
          dispatch(setUser());
          dispatch(setUserData(response.data));
        }, 500);
      }
    } catch(err) {
      console.log(err);
      openNotificationWithIcon("error", "Unable to sign up");
    }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonDisable(true)
    let { name, USERID, password } = e.target;
    name = name.value;
    USERID = USERID.value;
    password = password.value;

    let email = "NA";
    let phone = "NA";

    if (role === "0") {
      openNotificationWithIcon("error", "Please choose a role");
      return;
    }

    if (!name || !USERID || !password) {
      openNotificationWithIcon("error", "Please enter all credentials");
      setButtonDisable(false)
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
      openNotificationWithIcon("error", "Please enter a valid email address or phone number");
      setButtonDisable(false)
      return;
    }

    try {
      const response = await registerWithEmailAndPassword(name, email, phone, password, role);
      if (response) {
  
        openNotificationWithIcon("success", "Sign in successful!");
        setTimeout(() => {
          dispatch(setUser());
          dispatch(setUserData(response));
          setButtonDisable(false)
          Navigate("/");
        },500)
  
      } else {
        openNotificationWithIcon("error", "Email already in use");
      }
    } catch(err) {
      console.log(err);
      openNotificationWithIcon("error", "Email already in use");
    }

    

    e.target.name.value = "";
    e.target.password.value = "";
    e.target.USERID.value = "";
    setButtonDisable(false)
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
      <h1>CREATE ACCOUNT</h1>
      <div className="formSection">
        <form onSubmit={handleSubmit}>
          <label>NAME</label>
          <input name="name" type="text" />
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
          <Radio.Group
            className="radio"
            name="role"
            onChange={radioChange}
            value={role}
          >
            <Radio value={"Customer"}>Customer</Radio>
            <Radio value={"Vendor"}>Vendor</Radio>
          </Radio.Group>
          <button disabled={buttonDisable}>{buttonDisable === true ? "SINGING UP... ": "SIGN UP" }</button>
        </form>
        <p>
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
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

export default Signup;

// import { Link, useNavigate } from "react-router-dom";
// import React, { useState, useRef } from "react";
// import { Modal } from "antd";
// import { notification, Radio } from "antd";
// import {
//   signInWithGoogle,
//   registerWithEmailAndPassword,
// } from "../firebase/auth";
// import OtpInput from "react-otp-input";

// import { setUserData, setUser } from "../features/user/userSlice";
// import { useSelector, useDispatch } from "react-redux";

// import "../assets/styles/common.scss";

// // type NotificationType = 'success' | 'info' | 'warning' | 'error';

// const Signup = () => {
//   const user = useSelector((state) => state.user);

//   const [role, setRole] = useState("0");
//   const [api, contextHolder] = notification.useNotification();
//   const [otp, setOtp] = useState("");
//   // const [value, setValue] = useState("");
//   // const inputRef = useRef(null);
//   console.log(otp, "otp");
//   const Navigate = useNavigate();
//   const dispatch = useDispatch();

//   const openNotificationWithIcon = (type, message) => {
//     api[type]({
//       message: message,
//     });
//   };

//   const radioChange = (e) => {
//     console.log("radio checked", e.target.value);
//     setRole(e.target.value);
//   };

//   const authRegistration = async () => {
//     const response = await signInWithGoogle();

//     if (response?.status === 201) {
//       dispatch(setUser());
//       dispatch(setUserData(response.data));
//       Navigate("/");
//       return openNotificationWithIcon("success", "Sign in successfull!");
//     }
//   };

//   const phoneRegistration = async () => {
//     const response = await signInWithGoogle();

//     if (response?.status === 201) {
//       dispatch(setUser());
//       dispatch(setUserData(response.data));
//       Navigate("/");
//       return openNotificationWithIcon("success", "Sign in successfull!");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let { name, email, password } = e.target;
//     name = name.value;
//     email = email.value;
//     password = password.value;

//     if (role === 0) {
//       openNotificationWithIcon("error", "Please choose role");
//       return;
//     }

//     if (!name || !email || !password) {
//       openNotificationWithIcon("error", "Please Enter All Credentials");
//       return;
//     }

//     const response = await registerWithEmailAndPassword(
//       name,
//       email,
//       password,
//       role
//     );

//     if (response) {
//       dispatch(setUser());
//       dispatch(setUserData(response));
//       openNotificationWithIcon("success", "Sign in successfull!");
//       Navigate("/");
//     } else {
//       openNotificationWithIcon("error", "Email Already in use");
//     }

//     e.target.name.value = "";
//     e.target.password.value = "";
//     e.target.email.value = "";
//   };

//   // const handleChange = (event) => {
//   //   let val = event.target.value;
//   //   let isNumber = /^[0-9]+$/.test(val);

//   //   if (isNumber && val.length > 10) {
//   //     val = val.slice(0, 10);
//   //   }

//   //   setValue(val);
//   // };

//   return (
//     <div className="sign">
//       {contextHolder}

//       <h1>CREATE ACCOUNT</h1>

//       <div className="formSection">
//         <form onSubmit={handleSubmit}>
//           <label>NAME</label>
//           <input name="name" type="text" />

//           <label>EMAIL</label>
//           <input
//             // ref={inputRef}
//             name="password"
//             type="email"
//             // value={value}
//             // onChange={handleChange}
//             // placeholder="Enter your email or phone number"
//           />
//           <label>PASSWORD</label>
//           <input name="password" type="password" />

//           <Radio.Group
//             className="radio"
//             name="role"
//             onChange={radioChange}
//             value={role}
//           >
//             <Radio value={"Customer"}>Customer</Radio>
//             <Radio value={"Vendor"}>Vendor</Radio>
//           </Radio.Group>

//           <button>SIGN UP</button>
//         </form>

//         <p>
//           Already have an account? <Link to="signin">Sign in</Link>
//         </p>

//         <button className="authButton" onClick={authRegistration}>
//           <img
//             src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
//             alt="#"
//           />
//           <p>Sign in with Google</p>
//         </button>

//         {/* <button
//           className="authButton"
//           onClick={showModal}
//           style={{ color: "green", borderColor: "green" }}
//         >
//           <img
//             src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Green_Phone_Font-Awesome.svg/1024px-Green_Phone_Font-Awesome.svg.png"
//             alt="#"
//           />
//           <p>Sign up with Phone</p>
//         </button> */}

//         {/* <Modal
//           open={isModalOpen}
//           onOk={handleOk}
//           onCancel={handleCancel}
//           footer={[]}
//         >
//           <div className="phoneSection">
//             <form onSubmit={handleSubmit}>
//               <label>NAME</label>
//               <input name="name" type="text" />

//               <label>Phone</label>
//               <input name="phone" type="text" />

//               <div className="flex justify-center">
//                 <OtpInput
//                   value={otp}
//                   onChange={setOtp}
//                   numInputs={4}
//                   separator={<span>-</span>}
//                   renderInput={(props) => <input {...props} />}
//                   inputStyle={{
//                     background: "#FFFFFF",
//                     color: "#000000",
//                     border: "1px solid #D1D5DB",
//                     borderRadius: "0.375rem",
//                     padding: "0.5rem",
//                     margin: "0.5rem",
//                     textAlign: "center",
//                   }}
//                 />
//               </div>

//               <button>SIGN UP</button>
//             </form>
//           </div>
//         </Modal> */}
//       </div>
//     </div>
//   );
// };

// export default Signup;
