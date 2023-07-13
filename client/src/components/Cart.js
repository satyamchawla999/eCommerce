import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { CartItems, CartInfoSection } from "./subComponents";
import axios from "axios";
import "../assets/styles/cart.scss"

const Cart = () => {
  const userData = useSelector((state) => state.userData);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(false);
  const [delivery, setDelivery] = useState(200);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(discount + delivery + cartTotal)

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
          setTotal(discount + delivery + details?.sum)


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

  // const handleCoupon = () => {
  //   const value = Coupon.current.value;
  //   if (value === "FREEDEL") {
  //     setDelivery(0);
  //   }

  //   if (value === "EPIC") {
  //     setDiscount(total * 0.25);
  //   }
  // }

  return (
    <div className="cart">
      <p className="heading">CART</p>

      <div className="cartContainer">
        <div className="cartItemSection">
          {cartItems.map((item, index) => (
            <CartItems key={index} item={item} handleQuantityChange={handleQuantityChange} />))}
        </div>

        <>
          <CartInfoSection 
          cartTotal={cartTotal}
          discount={discount}
          delivery={delivery}
          total={total}
          Coupon={Coupon}
          setTotal={setTotal}
          // handleCoupon={handleCoupon}
          />
        </>

      </div>


    </div>
  );
};

export default Cart;
