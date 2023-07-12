import React,{useState} from "react";
import { Modal } from "antd";
import { ModalData } from "./";
import { useSelector } from "react-redux";
import axios from "axios"

const ProductItems = (props) => {
  const { product } = props;
  const userData = useSelector((state) => state.userData);
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

  const handleDelete = async () => {
    try {
      const response = await axios.post("http://localhost:8000/product/delete",{uid:product.uid});
      if(response.status===201) {
        console.log("Deleted Successfully!")
      }
    } catch(err) {
      console.log(err);
    }
  }
  return (
    <>
      <div key={product.uid} className="group relative">
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
            {userData.role === "Customer" ? (
              <p className="mt-1 text-sm text-gray-500">
                {product.description}
              </p>
            ) : (
              <p className="mt-1 text-sm text-gray-500">Rs {product.price}</p>
            )}
          </div>

          {userData.role === "Customer" ? (
            <p className="text-sm font-medium "> Rs {product.price}</p>
          ) : (
            <p className="text-sm font-medium">
              <span>
                <span className="editIcon" onClick={showModal} data-name="edit">
                  <i className="fa-solid fa-pen-to-square"></i>
                </span>
              </span>

              <span className="text-red-500 ml-2 editIcon" onClick={handleDelete} >
                <i className="fa-regular fa-trash-can"></i>
              </span>
            </p>
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
    </>
  );
};

export default ProductItems;
