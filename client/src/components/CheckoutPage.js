import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { CartItems, CartInfoSection } from "./subComponents";
import axios from "axios";
import "../assets/styles/cart.scss";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const [couponData, setCouponData] = useState(useSelector((state) => state.coupon))

  const userData = useSelector((state) => state.userData);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(false);
  const [delivery, setDelivery] = useState(200);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState((delivery + cartTotal) - discount);
  const [cartInfo, setCartInfo] = useState(false);
  const { state } = useLocation();
  console.log("state", state);


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

          let details = getDetails()

          setCartItems(response.data);
          setCartTotal(details?.sum);
          if (couponData === "FREEDEL") {
            setDelivery(0)
            setTotal(discount + 0 + details?.sum)
          } else if (couponData === "EPIC") {
            const d = details?.sum * 0.25
            setDiscount(d);
            setTotal((details?.sum - d) + 200)
          } else {
            setTotal((delivery + details?.sum) - discount)
          }

          setCartInfo(true)

        }
      } catch (err) {
        console.log(err);
      }
    };

    getCartItems();
  }, [cartQuantity]);


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
        setCartQuantity(!cartQuantity)
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
        setCartQuantity(!cartQuantity)
      }
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="cart">
      <p className="heading">Checkout</p>


      <div className="cartContainer">
        <div className="cartItemSection">
          {cartItems.length === 0 && <div className="emptyCart"><img src="https://shop.millenniumbooksource.com/static/images/cart1.png"></img></div>}
          {cartItems.map((item, index) => (
            <CartItems page="checkout" key={index} item={item} handleQuantityChange={handleQuantityChange} handleItemDelete={handleItemDelete} />))
          }
        </div>

        {cartInfo === true && <CartInfoSection
          cartItems={cartItems}
          cartTotal={cartTotal}
          discount={discount}
          delivery={delivery}
          total={total}
          Coupon={Coupon}
          setTotal={setTotal}
          item={state}
          page="checkout"
          couponData={couponData}
          setCouponData={setCouponData}
        />}
        <>

        </>

      </div>


    </div>
  );
}

export default CheckoutPage