import React, { useEffect, useState } from 'react';
import axios from "axios";
import { BASE_IMG_URL } from '../../Utils/constant';
import { useSelector } from 'react-redux';
import AddressItems from './AddressItems';

const CartItems = (props) => {
    const { item, handleQuantityChange, key ,handleItemDelete , page  } = props;
    const product = item.product;
    const userData = useSelector((state)=>state.userData);

    let max = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [quantity, setQuantity] = useState(item.quantity)

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
                    {page === "cart" ? 
                    <select name="quantity" onChange={(e) => handleQuantityChange(e.target.value, product.uid)}>
                        {
                            max.map((q) => (quantity !== q ? <option value={q}>{q}</option> : <option value={q} selected>{q}</option>))
                        }
                    </select> : <> {quantity}</>}
                </div>
            </div>

            <div className='priceContainer'>
                <span>Price : {product.price * quantity}.00</span>
            </div>

            {page === "cart" && 
            <div className='removeContainer'>
                <p onClick={()=>handleItemDelete(key)}>Remove</p>
            </div>
            } 
            
        </div>
    )
}

export default CartItems;