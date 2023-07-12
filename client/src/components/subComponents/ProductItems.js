import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { ModalData } from "./";
import { useSelector } from "react-redux";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const ProductItems = (props) => {
  const { product, setDeleteProduct } = props;
  const userData = useSelector((state) => state.userData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productPage, setProductPage] = useState(false);

  const navigate = useNavigate();

  const showModal = (e) => {
    e.stopPropagation()
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post("http://localhost:8000/product/delete", { uid: product.uid });
      if (response.status === 201) {
        console.log("Deleted Successfully!");
        setDeleteProduct((prevValues) => (!prevValues));
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleProductPage = (e) => {
    // e.stopPropagation()
    isModalOpen !== true && navigate(`/productpage/${product.uid}`)
    
  }

  return (
    <div onClick={handleProductPage} className="handleProduct">
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={`http://localhost:8000/Products/${product.imgUrl[0]}`}
            alt={product.imageAlt}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href={product.href}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </a>
            </h3>
            {userData.role !== "Vendor" ? (
              <p className="mt-1 text-sm text-gray-500">
                {product.description}
              </p>
            ) : (
              userData.uid === product.vUid ? <p className="mt-1 text-sm text-gray-500">
                Rs {product.price}
              </p> : <p className="mt-1 text-sm text-gray-500">
                {product.description}
              </p>
            )}
          </div>

          {userData.role !== "Vendor" ? (
            <p className="text-sm font-medium "> Rs {product.price}</p>
          ) : (
            userData.uid === product.vUid ? <>
              <p className="text-sm font-medium">
                <span>
                  <button className="editIcon" onClick={showModal} data-name="edit">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </span>

                <button className="text-red-500 ml-2 editIcon" onClick={handleDelete} >
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </p>
            </> : <>
              <p className="text-sm font-medium "> Rs {product.price}</p>
            </>
          )}
        </div>
      </div>

      <Modal
        title="Edit Product"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        width={1000}
      >
        <ModalData product={product} />
      </Modal>
    </div>
  );
};

export default ProductItems;
