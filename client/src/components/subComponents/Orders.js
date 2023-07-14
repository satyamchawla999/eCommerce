import React, { useEffect, useState } from 'react';
import Products from './Products';
import axios from 'axios';

function Orders() {

    const [orders,setOrders] = useState([]);
    console.log(orders)
    useEffect(()=>{
        const getOrders = async () => {
            try {
              const response = await axios.get(
                "http://localhost:8000/order/get-orders"
              );
      
              if (response.status === 201) {
                setOrders(response.data);
              }
            } catch (err) {
              console.log(err);
            }
          };
          getOrders();
    },[])
  return (
    <div>
        <p>Orders</p>
        <Products type="orders"/>
    </div>
  )
}

export default Orders