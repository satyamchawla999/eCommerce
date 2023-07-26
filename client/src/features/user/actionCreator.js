import {getCartItemsFromDB} from "../../Utils/service";

export const fetchCartItems = createAsyncThunk(
    "cart/fetchCartItems",
    async(uid)=>{
        const response = await getCartItemsFromDB(uid);
        console.log(response.data)
        return response?.data
    }
)