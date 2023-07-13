import React, { useEffect, useState } from 'react'

const CartInfoSection = (props) => {
    const { cartTotal, Coupon, total, setTotal } = props

    const [orderTotal, setOrderTotal] = useState(0)
    const [delivery, setDelivery] = useState(props.delivery);
    const [discount, setDiscount] = useState(props.discount);

    useEffect(() => {
        // setTotal(total+delivery-(discount));
        // console.log("hello")
        setOrderTotal(total)
    }, [total,Coupon]);

    const handleCoupon = () => {

        // console.log("hello")


        const value = Coupon.current.value;
        let discount = props.discount;
        let delivery = props.delivery
        if (value === "FREEDEL") {
            setDelivery(0);
            delivery = 0;
        }

        if (value === "EPIC" && cartTotal >= 2589) {
            setDiscount(total * 0.25);
            discount = total * 0.25;
        }

        setOrderTotal(cartTotal + delivery - (discount))



        // setTotal(total+delivery-(discount))
    }


    return (
        <div className="cartInfoSection">
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

            <div className="orderDetailItems">
                <input name="applyCoupon" placeholder="Apply Coupon" ref={Coupon} />
                <button onClick={handleCoupon}>Apply</button>
            </div>

            <div className="orderDetailItems">
                <button className="buyButton">Proceed to Buy</button>
            </div>

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

        </div>
    )
}

export default CartInfoSection