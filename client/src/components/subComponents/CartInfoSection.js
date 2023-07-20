import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import Address from "./Address";
import AddressItems from "./AddressItems";
import { setCoupon } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { addOrdersInDB, cartEmpty } from "../../Utils/service";

const CartInfoSection = (props) => {
  const userData = useSelector((state) => state.userData);
  const {
    cartTotal,
    cartQuantity,
    Coupon,
    total,
    page,
    item,
    couponData,
    setCouponData,
    cartInfo,
  } = props;
  console.log(cartQuantity, "total cartQuantity");

  const dispatch = useDispatch();
  const [displayCoupon, setDisplayCoupon] = useState("");

  const [orderTotal, setOrderTotal] = useState(0);
  const [delivery, setDelivery] = useState(
    cartQuantity === 0 ? 0 : props.delivery
  );
  const [discount, setDiscount] = useState(props.discount);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const showModal = () => {
    if (cartQuantity === 0) {
      openNotificationWithIcon("error", "Cart is Empty!");
      return;
    } else {
      setIsModalOpen(true);
    }
  };

  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  useEffect(() => {
    setOrderTotal(total);
  }, [Coupon, total]);

  const handleCoupon = (e) => {
    e.preventDefault();

    const value = Coupon.current.value;
    let discount = props.discount;
    let delivery = props.delivery;

    if (value === "FREEDEL") {
      const data = { coupon: "FREEDEL" };
      dispatch(setCoupon(data));
      setDiscount(0);
      setDelivery(0);
      delivery = 0;
      discount = 0;
      setCouponData("FREEDEL");
      setDisplayCoupon(value);
    } else if (value === "EPIC" && cartTotal >= 2589) {
      const data = { coupon: "EPIC" };
      dispatch(setCoupon(data));
      setDiscount(total * 0.25);
      setDelivery(200);
      discount = total * 0.25;
      setCouponData("EPIC");
      setDisplayCoupon(value);
    } else {
      openNotificationWithIcon("error", "Invalid Coupon");
    }

    setOrderTotal(cartTotal + delivery - discount);
  };

  const handleBuy = async () => {
    if (cartQuantity === 0) {
      openNotificationWithIcon("error", "Cart is Empty!");
      return;
    }

    try {
      let cartItems = props.cartItems;
      cartItems.forEach((value) => {
        const product = value.product;
        let sales = product.price * value.quantity;
        if (couponData === "FREEDEL") sales = sales - 200;
        if (couponData === "EPIC") sales = sales - sales * 0.25 + 200;
        const data = {
          imgUrl: product.imgUrl[0],
          cName: userData.name,
          name: product.name,
          description: product.description,
          vName: product.vName,
          price: product.price,
          pUid: product.uid,
          vUid: product.vUid,
          cUid: userData.uid,
          address: item,
          status: "Successfull",
          coupon: couponData,
          quantity: value.quantity,
          sales: sales,
          units: value.quantity,
        };
        console.log("product", data);

        const addOrder = async () => {
          try {
            const response = await addOrdersInDB(data)

            if (response.status === 201) {
              console.log("added to cart");
            }
          } catch (err) {
            console.log(err);
          }
        };

        addOrder();
      });

      const emptyCart = async () => {
        try {
          const response = await cartEmpty(userData.uid)

          if (response.status === 201) {
            console.log("added to cart");
          }
        } catch (err) {
          console.log(err);
        }
      };

      emptyCart();
      openNotificationWithIcon("success", "Order Placed");
      // navigate({pathName:"/profile"},{state:"Your Orders"});
      navigate({ pathname: "/profile" }, { state: "Your Orders" });
      // navigate("")
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setCouponData(e.target.value);
    if (e.target.value === "") {
      setOrderTotal(cartTotal + 200);
      setDelivery(200);
      setDiscount(0);
      setDisplayCoupon("");
    }
  };

  return (
    <div className="cartInfoSection">
      {contextHolder}
      <p className="detailHeading">Order Details</p>

      <div className="orderDetailItems">
        <p>Cart Total : </p>
        <p>{cartTotal} Rs</p>
      </div>

      <div className="orderDetailItems">
        <p>Cart Discount : </p>
        <p>{discount} Rs</p>
      </div>

      <div className="orderDetailItems">
        <p>Delivery Fee : </p>
        <p>{delivery} Rs</p>
      </div>

      <div className="orderDetailItems orderTotal">
        <p>Order Total : </p>
        <p>{orderTotal} Rs</p>
      </div>

      {page !== "checkout" && (
        <div className="orderDetailItems">
          <form>
            <input
              name="applyCoupon"
              placeholder="Apply Coupon"
              onChange={handleInputChange}
              value={couponData}
              ref={Coupon}
            />
            <button onClick={handleCoupon}>Apply</button>
          </form>
        </div>
      )}

      {displayCoupon !== "" && (
        <p
          style={{
            width: "100%",
            color: "red",
            textAlign: "center",
            padding: "0",
          }}
        >
          {displayCoupon} is applied
        </p>
      )}

      {page !== "checkout" ? (
        <div className="orderDetailItems">
          <button className="buyButton" onClick={showModal}>
            Proceed to Buy
          </button>
        </div>
      ) : (
        <div className="orderDetailItems" onClick={handleBuy}>
          <button className="buyButton">Checkout</button>
        </div>
      )}
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        width={1000}
      >
        <Address display={"Select Address To Proceed"} />
      </Modal>

      {page !== "checkout" ? (
        <div className="offers">
          <p className="offerHeading">Latest Offers</p>
          <div>
            <p>FREEDEL</p>
            <p className="desc">Free Shipping For Limited Period.</p>
          </div>
          <div>
            <p>EPIC</p>
            <p className="desc">Extra Upto 25% Off on 2589</p>
          </div>
        </div>
      ) : (
        <>
          <div className="offers">
            <p className="offerHeading">Address</p>
            <AddressItems item={item} page={"checkout"} />
          </div>
        </>
      )}
    </div>
  );
};

export default CartInfoSection;
