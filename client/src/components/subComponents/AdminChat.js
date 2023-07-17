import React, { useEffect, useState } from "react";
import "../../assets/styles/adminChat.scss";
import { useSelector } from "react-redux";
import { Chat } from "../subComponents";
import axios from "axios";

const AdminChat = () => {
  const [display, setDisplay] = useState("Profile");
  const [users, setUsers] = useState([]);
  const [uid, setUid] = useState("");

  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    const getChatUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/chat/get-chat-users"
        );

        if (response.status === 201) {
          setUsers(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getChatUsers();
  }, [display]);

  const handleDisplay = (value,uid) => {
    setDisplay(value);
    setUid(uid)
  };

  return (
    <div className="adminChat">
      <div className="profileInfo">
        <div className="profileImage">
          <img src="" />
          <p>
            {userData?.name}
            <br />
            {userData?.role}
          </p>
        </div>

        {users.map((user) => (
          <div
            className={`customerInfoItems ${display === user?.cName && "toggel"}`}
            onClick={() => handleDisplay("Profile",user.cUid)}
          >
            {user?.cName}
          </div>
        ))}
      </div>

      <div className="chatSection">
        {uid !== "" && <Chat uid={uid}/>}
      </div>
    </div>
  );
};

export default AdminChat;
