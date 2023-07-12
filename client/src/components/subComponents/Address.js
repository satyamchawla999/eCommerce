import React, { useState } from 'react';
import "../../assets/styles/address.scss";
import { useSelector } from "react-redux";
import axios from 'axios';

const Address = () => {

    const userData = useSelector((state) => state.userData);
    const [address,setAddress] = useState({});
    console.log(address)

    const handleSubmit = async (e) => {

        e.preventDefault()

        const target = e.target;

        const data = {
            uid:userData.uid,
            hno:target.hno.value,
            street:target.street.value,
            landmark:target.landmark.value,
            city:target.city.value,
            state:target.state.value,
            pincode:target.pincode.value,
        }

        console.log(data);

        try {
            const response = await axios.post(
                "http://localhost:8000/user/add-address",data
            );

            if (response.status === 201) {
                setAddress(response.data);
            }
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="address">
            <form onSubmit={handleSubmit}>
                <label>House No.</label>
                <input name="hno" type="text" required />
                <label>Street</label>
                <input name="street" type="text" required />
                <label>Landmark</label>
                <input name="landmark" type="text" required />
                <label>City</label>
                <input name="city" type="text" required />
                <label>State</label>
                <input name="state" type="text" required />
                <label>Pincode</label>
                <input name="pincode" type="text" required />

                <button>
                    Add Address
                </button>
            </form>
        </div>
    )
}

export default Address