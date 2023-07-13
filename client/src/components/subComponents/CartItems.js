import React, { useState } from 'react';
import { BASE_IMG_URL } from '../../Utils/constant';

const CartItems = (props) => {
    const { item, handleQuantityChange } = props;
    const product = item.product;
    console.log("item", item);
    let max = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const [quantity, setQuantity] = useState(item.quantity);

    

    return (
        <div className='cartItems'>
            <div className='imgContainer'>
                <img src={BASE_IMG_URL + product.imgUrl[0]} alt="#" />
            </div>

            <div className='infoContainer'>
                <span className='name'>{product.name}</span>
                <span>{product.description}</span>
                <span>Seller: {product.vName}</span>
            </div>

            <div className='qtyContainer'>
                <div >
                    Quantity :
                    <select name="quantity" onChange={(e)=>handleQuantityChange(e.target.value,product.uid)}>
                        {
                            max.map((q) => (quantity !== q ? <option value={q}>{q}</option> : <option value={q} selected>{q}</option>))
                        }
                    </select>
                </div>
            </div>

            <div className='priceContainer'>
                <span>Price : {product.price * quantity}.00</span>
            </div>

            <div className='removeContainer'>
                Remove
            </div>
        </div>
    )
}

export default CartItems;