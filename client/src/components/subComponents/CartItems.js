import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_IMG_URL } from "../../Utils/constant";
import { useSelector } from "react-redux";
import "../../assets/styles/cart.scss";

const CartItems = (props) => {
  const {
    item,
    handleQuantityChange,
    handleStatusChange,
    key,
    handleItemDelete,
    page,
  } = props;

  const [quantity, setQuantity] = useState(item.quantity);
  const userData = useSelector((state) => state.userData);

  let product = {};
  let address = {};

  if (page !== "orders") {
    product = item?.product;
  } else {
    product = item;
    address = product.address;
  }

  const max = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const status = ["Successful", "Shipped", "Out For Delivery", "Delivered"];

  const getDate = (originalDateTime) => {
    const dateTime = new Date(originalDateTime);
    const formattedDate = dateTime.toLocaleDateString();
    return formattedDate;
  };

  return (
    <div className="cartItems">
      <div className="imgContainer">
        {page === "orders" ? (
          <img src={BASE_IMG_URL + product.imgUrl} alt="#" />
        ) : (
          <img src={BASE_IMG_URL + product.imgUrl[0]} alt="#" />
        )}
      </div>

      <div className="infoContainer">
        <span className="name">{product.name}</span>
        {page === "orders" ? (
          <>
            <br />
            <span>
              Purchased Date :<br />
              {getDate(item.createdAt)}
            </span>
            <span>
              {userData.role === "Customer" ? "Seller" : "Customer"}:{" "}
              {product.vName}
            </span>
          </>
        ) : (
          <>
            <span>{product.description}</span>
            <span>Seller: {product.vName}</span>
            <span>{item.createdAt}</span>
          </>
        )}
      </div>

      <div className="qtyContainer">
        {page === "orders" && (
          <span>Price : {product.price * quantity}.00</span>
        )}
        <div>
          Quantity :
          {page === "cart" ? (
            <select style={{border:"none"}}
              name="quantity"
              onChange={(e) =>
                handleQuantityChange(e.target.value, product.uid)
              }
            >
              {max.map((q) => (
                <option value={q} selected={quantity === q}>
                  {q}
                </option>
              ))}
            </select>
          ) : (
            <>{quantity}</>
          )}
        </div>

        {page === "orders" && (
          <>
            <br />
            <br />
            <br />
            {userData.role === "Customer" ? (
              <span style={{border:"none",padding:"0px"}}>{product.status}</span>
            ) : (
              <span>
                <select style={{border:"none",padding:"0px"}}
                  name="status"
                  onChange={(e) =>
                    handleStatusChange(e.target.value, product._id)
                  }
                >
                  {status.map((s) => (
                    <option value={s} selected={product.status === s}>
                      {s}
                    </option>
                  ))}
                </select>
              </span>
            )}
          </>
        )}
      </div>

      {page === "orders" ? (
        <div className="priceContainer" style={{ fontSize: "12px" }}>
          <p style={{ fontSize: "18px" }}>Address</p>
          <p>House no : {address.hno}</p>
          <p>Street : {address.street}</p>
          <p>Landmark : {address.landmark}</p>
          <p>City : {address.city}</p>
          <p>State : {address.state}</p>
          <p>Pincode : {address.pincode}</p>
        </div>
      ) : (
        <div className="priceContainer">
          <span>Price : {product.price * quantity}.00</span>
        </div>
      )}

      {page === "cart" && (
        <div className="removeContainer">
          <p onClick={() => handleItemDelete(key)}>Remove</p>
        </div>
      )}
    </div>
  );
};

export default CartItems;
