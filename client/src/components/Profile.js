import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AddProductForm,
  Products,
  Address,
  UpdateProfile,
  Orders,
  VendorList
} from "./subComponents";

import "../assets/styles/profile.scss";
import { getUserImages } from "../Utils/constant";

const Profile = () => {
  const userData = useSelector((state) => state.userData);
  const [img, image] = useState(getUserImages(userData));

  const {state} = useLocation();
  const [display, setDisplay] = useState(state ? state : "Profile");

  const handleDisplay = (value) => {
    setDisplay(value);
  };

  const toggel = "toggel";

  return (
    <div className="profile">
      <div className="profileInfo">
        <div className="profileImage">
          <img src={img.image1} />
          <p>
            {userData.name}
            <br />
            {userData.role}
          </p>
        </div>

        <div
          className={`profileInfoItems ${display === "Profile" && toggel}`}
          onClick={() => handleDisplay("Profile")}
        >
          Profile
        </div>
        {userData.role !== "Customer" && (
          <>
            <div
              className={`profileInfoItems ${display === "Your Products" && toggel
                }`}
              onClick={() => handleDisplay("Your Products")}
            >
              Your Products
            </div>
            <div
              className={`profileInfoItems ${display === "Draft" && toggel}`}
              onClick={() => handleDisplay("Draft")}
            >
              Draft
            </div>
          </>
        )}

        <div
          className={`profileInfoItems ${display === "Address" && toggel}`}
          onClick={() => handleDisplay("Address")}
        >
          Address
        </div>
        {userData.role !== "Customer" && <div
          className={`profileInfoItems ${display === "Orders" && toggel}`}
          onClick={() => handleDisplay("Orders")}
        >
          Orders
        </div>}
        {userData.role === "Admin" && (
          <div
            className={`profileInfoItems ${display === "Vendor List" && toggel
              }`}
            onClick={() => handleDisplay("Vendor List")}
          >
            Vendor List
          </div>
        )}

        <div
          className={`profileInfoItems ${display === "Your Orders" && toggel}`}
          onClick={() => handleDisplay("Your Orders")}
        >
          Your Orders
        </div>
      </div>

      <div className="profileProductSection">
        {display === "Orders" && (
          <>
            <Orders display={display} />
          </>
        )}
        {display === "Profile" && (
          <>
            <UpdateProfile display={display} />
          </>
        )}
        {display === "Your Products" && (
          <>
            {userData.role !== "Customer" && <AddProductForm draft={false} display={display} />}

            {/* <Products draft={false} display={display} /> */}
          </>
        )}
        {display === "Draft" && (
          <>
            <Products draft={true} display={display} />
          </>
        )}
        {display === "Address" && (
          <>
            <Address display={display} />
          </>
        )}
        {display === "Vendor List" && (
          <>
            <VendorList display={display} />
          </>
        )}
        {display === "Your Orders" && (
          <>
            <Orders display={display} />
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
