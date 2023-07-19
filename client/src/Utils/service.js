import axios from "axios";
export const getProductsFromDB = () => axios.get("http://localhost:8000/product/get-product");
export const getChatMessages = (uid) => axios.post("http://localhost:8000/chat/get-messages", { uid: uid });
export const setUserRole = (data) => axios.post("http://localhost:8000/user/set-user-role", data);