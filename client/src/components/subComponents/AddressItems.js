import React from "react";

const AddressItems = (props) => {
  const { item, number } = props;
  return (
    <div className="addressItems">
      <h3><p>Address : {number + 1}</p><i class="fa-regular fa-trash-can"></i></h3>
      <p>Name : {item.hno}</p>
      <p>Street : {item.street}</p>
      <p>Landmark : {item.landmark}</p>
      <p>City : {item.city}</p>
      <p>State : {item.state}</p>
      <p>Pincode : {item.pincode}</p>
    </div>
  );
};

export default AddressItems;
