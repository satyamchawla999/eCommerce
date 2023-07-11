import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import { ModalData, ProductItems } from "./";
import "../../assets/styles/products.css";
import axios from "axios";

const Products = () => {
  const userData = useSelector((state) => state.userData);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/product/get-product"
        );

        if (response.status === 201) {
          setProducts(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map(
              (product) =>
                product?.vUid === userData.uid && (
                  <ProductItems product={product} />
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
