import {createSlice} from "@reduxjs/toolkit";
import {fetchCartItems} from "./actionCreator"

const initialState = {
    cartCount: 0,
    cartItems:[],
    loading:false,
    coupon:""
};

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(fetchCartItems.pending,(state)=>{
            state.loading = true;
        })

        .addCase(fetchCartItems.fulfilled,(state,action)=>{
            state.cartItems = action.payload; 
            state.cartCount = state.cartItems.length;
            state.loading = false;
        })

        .addCase(fetchCartItems.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    },
});

export default cartSlice.reducer;