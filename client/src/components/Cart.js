import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { CartItems, CartInfoSection } from "./subComponents";
import axios from "axios";
import "../assets/styles/cart.scss";
import { setCoupon } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

const Cart = () => {
  const userData = useSelector((state) => state.userData);
  const [couponData,setCouponData] = useState("");

  const dispatch = useDispatch();


  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [delivery, setDelivery] = useState(200);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(discount + delivery + cartTotal)
  const [cartInfo, setCartInfo] = useState(false);
  const [change,setChange] = useState(false)

  const page = "cart"

  let Coupon = useRef(null)
  useEffect(() => {
    const getCartItems = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/user/get-cart-items",
          { uid: userData.uid }
        );

        if (response.status === 201) {

          let data = response.data;
          let sum = 0;
          let quantity = 0;

          const getDetails = () => {
            data.forEach((item) => {
              let price = parseInt(item.product.price) * parseInt(item.quantity)
              sum = sum + price;
            })
            return { sum, quantity };
          }

          let details = getDetails();

          setCartItems(response.data);
          setCartQuantity(details.quantity)
          setCartTotal(details?.sum);
          const d = details?.sum*0.25
          if(couponData === "FREEDEL") {
            setDelivery(0)
            setTotal(0 + details?.sum)
          } else if(couponData === "EPIC") {
            
            setDiscount(d);
            setTotal((details?.sum-d)+200)
          } else {
            setTotal((delivery + details?.sum)-discount)
          }

          setCartInfo(true);
          dispatch(setCoupon({coupon:couponData}));

        }
      } catch (err) {
        console.log(err);
      }
    };

    getCartItems();
  }, [change]);


  const handleQuantityChange = async (q, pid) => {
    const quantity = q;
    const data = {
      uid: userData.uid,
      pUid: pid,
      quantity: quantity,
      update: true,
    }

    console.log(data);

    try {
      const response = await axios.post(
        "http://localhost:8000/user/add-cart", data
      );

      if (response.status === 201) {
        console.log("added to cart");
        setChange(!change)
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleItemDelete = async (index) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/user/delete-items", { uid: userData.uid, index: index, type: "cart" }
      );

      if (response.status === 201) {
        console.log(response.data);
        setChange(!change)
      }
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="cart">
      <p className="heading">CART</p>

      <div className="cartContainer">
        <div className="cartItemSection">
          {cartItems.length === 0 && <div className="emptyCart"><img src="https://shop.millenniumbooksource.com/static/images/cart1.png"></img></div>}
          {cartItems.map((item, index) => (
            <CartItems page={"cart"} key={index} item={item} handleQuantityChange={handleQuantityChange} handleItemDelete={handleItemDelete} />))
          }
        </div>

        <>
        {cartInfo === true && <CartInfoSection
            cartTotal={cartTotal}
            cartQuantity={cartQuantity}
            discount={discount}
            delivery={delivery}
            total={total}
            Coupon={Coupon}
            setTotal={setTotal}
            setCouponData={setCouponData}
            page="cart"
          />}
        </>

      </div>


    </div>
  );
};

export default Cart;
