import React,{useEffect, useState} from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Cart = () => {
  const userData = useSelector((state) => state.userData);
  const [cartItems,setCartItems] = useState([])

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/user/get-cart-items",
          { uid: userData.uid }
        );

        if (response.status === 201) {
            setCartItems(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getCartItems();
  }, []);
  return <div></div>;
};

export default Cart;
