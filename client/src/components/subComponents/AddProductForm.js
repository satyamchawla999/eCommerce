import React, { useState, useEffect, useRef } from "react";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import {ModalData} from "../subComponents";
// import "../assets/styles/profile.scss";

const AddProductForm = () => {
  
  const userData = useSelector((state) => state.userData);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(()=>{
    console.log("hey")
  },[isModalOpen])
  
  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      <button className="addButton" onClick={showModal}>
        &nbsp;+&nbsp;
      </button>

      <Modal
        title="Add Product"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        width={1000}
      >
        <ModalData/>
      </Modal>
    </>
  );
};

export default AddProductForm;
