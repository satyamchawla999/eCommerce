import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AddProductForm, Products } from "./subComponents";
import axios from "axios";

import "../assets/styles/profile.scss";

const Profile = () => {
  const userData = useSelector((state) => state.userData);
  const user = useSelector((state) => state.user);

  const Navigate = useNavigate();

  useEffect(() => {
    if (!user) Navigate("/signin");
  }, []);

  return (
    <div className="profile">
      <div className="profileInfo">
        <div className="profileImage">
          <img src={userData.imgUrl} />
          <p>
            {userData.name}
            <br />
            {userData.role}
          </p>
        </div>

        <div className="profileInfoItems">Your Products</div>
      </div>

      <div className="profileProductSection">
        {userData.role === "Vendor" && <AddProductForm />}
        <Products/>
      </div>
    </div>
  );
};

export default Profile;
