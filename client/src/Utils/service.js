import axios from "axios"

export const getChatMessages = (uid) => axios.post(
    "http://localhost:8000/chat/get-messages",
    { uid: uid })