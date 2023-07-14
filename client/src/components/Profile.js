import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AddProductForm, Products, Address , UpdateProfile , Orders} from "./subComponents";

import "../assets/styles/profile.scss";

const Profile = () => {
  const userData = useSelector((state) => state.userData);
  const user = useSelector((state) => state.user);

  const [display, setDisplay] = useState("Update Profile");

  const Navigate = useNavigate();

  useEffect(() => {
    if (!user) Navigate("/signin");
  }, []);

  const handleDisplay = (value) => {
    setDisplay(value)
  }

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

        <div className="profileInfoItems" onClick={() => handleDisplay("Update Profile")}>Update Profile</div>
        <div className="profileInfoItems" onClick={() => handleDisplay("Your Products")}>Your Products</div>
        <div className="profileInfoItems" onClick={() => handleDisplay("Draft")}>Draft</div>
        <div className="profileInfoItems" onClick={() => handleDisplay("Address")}>Address</div>
        <div className="profileInfoItems" onClick={() => handleDisplay("Orders")}>Orders</div>
        

      </div>

      <div className="profileProductSection">
        {userData.role === "Vendor" && <AddProductForm />}
        {display === "Orders" && <>
          <Orders display={display} />
        </>}
        {display === "Update Profile" && <>
          <UpdateProfile display={display} />
        </>}
        {display === "Your Products" && <>
          <Products draft={false} display={display} />
        </>}
        {display === "Draft" && <>
          <Products draft={true} display={display}/>
        </>}
        {display === "Address" && <>
          <Address display={display}/>
        </>}
      </div>
    </div>
  );
};

export default Profile;
