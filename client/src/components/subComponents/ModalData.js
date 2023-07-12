import React, { useState } from "react";
import { useSelector } from "react-redux";

const ModalData = (props) => {
  const { product } = props;
  const BASE_IMG_URL = "http://localhost:8000/Products/";
  const userData = useSelector((state) => state.userData);

  const [img, setImg] = useState({
    image1: (product ? (BASE_IMG_URL+product?.imgUrl[0]) : ""),
    image2: (product ? (BASE_IMG_URL+product?.imgUrl[1]) : ""),
    image3: (product ? (BASE_IMG_URL+product?.imgUrl[2]) : ""),
    image4: (product ? (BASE_IMG_URL+product?.imgUrl[3]) : ""),
  });
  const [values,setValues] = useState(product);

  const handleChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg((prevImg) => ({
          ...prevImg,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  let formAction = product ? "update-product" : "add-product";

  return (
    <>
      <form
        className="modalForm"
        method="post"
        action={`http://localhost:8000/product/${formAction}`}
        encType="multipart/form-data"
      >
        <div className="inputContainer">
          <div className="fileInput">
            <label htmlFor="image1">
              <img src={img.image1} alt="#" />
            </label>
            <input
              onChange={handleChange}
              id="image1"
              type="file"
              name="image1"
              accept="image/*"
              required
            />

            <label htmlFor="image2">
              <img src={img.image2} alt="#" />
            </label>
            <input
              onChange={handleChange}
              id="image2"
              type="file"
              name="image2"
              accept="image/*"
              required
            />

            <label htmlFor="image3">
              <img src={img.image3} alt="#" />
            </label>
            <input
              onChange={handleChange}
              id="image3"
              type="file"
              name="image3"
              accept="image/*"
              required
            />

            <label htmlFor="image4">
              <img src={img.image4} alt="#" />
            </label>
            <input
              onChange={handleChange}
              id="image4"
              type="file"
              name="image4"
              accept="image/*"
              required
            />
          </div>

          <div className="valueInput">
            <label>Product Name</label>
            <input type="text" name="name" value={values.name} required />
            {/* <input type="text" name="name" required /> */}

            <label htmlFor="category">Category</label>
            <select name="category" id="category">
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>

            <label htmlFor="subCategory">Sub Category</label>
            <select name="subCategory" id="subCategory">
              <option value="shirt">Shirt</option>
              <option value="tshirt">T-shirt</option>
              <option value="shoes">Shoes</option>
              <option value="jeans">Jeans</option>
            </select>

            <label>Price</label>
            <input type="number" name="price" required value={product?.price}/>
            {/* <input type="number" name="price" required /> */}

            <label>Description</label>
            <input type="text" name="description" required value={product?.description}/>
            {/* <input type="text" name="description" required /> */}

            <label>Product Code</label>
            <input type="text" name="uid" required value={product?.uid} disabled={product ? true : false} />
            {(product) && <input style={{display:"none"}} type="text" name="uid" required value={product?.uid} />}

            {/* <input type="text" name="uid" required /> */}

            <input
              className="disable"
              type="text"
              name="vName"
              value={product ? product?.vName : userData.name}
              required
            />

            {/* <input
              className="disable"
              type="text"
              name="vName"
              value={userData.name}
              required
            /> */}

            <input
              className="disable"
              type="text"
              name="vUid"
              value={product ? product?.vUid : userData.uid}
              required
            />

            {/* <input
              className="disable"
              type="text"
              name="vUid"
              value={userData.uid}
              required
            /> */}

            <label>Brand Name</label>
            <input type="text" name="brandName" required value={product?.brandName}/>
            {/* <input type="text" name="brandName" required /> */}
          </div>
        </div>
        <button>Submit</button>
      </form>
    </>
  );
};

export default ModalData;
