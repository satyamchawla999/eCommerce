import React, { useState } from "react";
import { useSelector } from "react-redux";

import { getValues, getImages } from "../../Utils/constant";

const ModalData = (props) => {

  const { product } = props;
  const userData = useSelector((state) => state.userData);

  const [values, setValues] = useState(getValues(product));
  const [img, setImg] = useState(getImages(product));
  const [draft, setDraft] = useState(false);

  const isRequired = product ? false : true;
  const formAction = product ? "update-product" : "add-product";

  // const handleSubmit = async () =>{
  //   console.log(values);
  //   // try {
  //   //   const response = await axios({
  //   //     method: "post",
  //   //     url: `http://localhost:8000/product/${formAction}`,
  //   //     headers : {"Content-Type":"multipart/form-data"}
  //   //   })
  //   // } catch (err) {

  //   // }
  // }

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

  const handleValues = (e) => {
    setValues(e.target.value)
  }

  const handleDraft = () => {
    setDraft(!draft)
  }



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
              required={isRequired}
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
              required={isRequired}
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
              required={isRequired}
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
              required={isRequired}
            />
          </div>

          <div className="valueInput">
            <label>Product Name</label>
            <input type="text" name="name" value={values?.name} onChange={handleValues} required />

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
            <input type="number" name="price" required value={values?.price} onChange={handleValues} />

            <label>Description</label>
            <input type="text" name="description" required value={values?.description} onChange={handleValues} />

            <label>Product Code</label>
            <input type="text" name="uid" required value={values?.uid} disabled={product ? true : false} onChange={handleValues} />
            {(product) && <input style={{ display: "none" }} type="text" name="uid" required value={values?.uid} />}

            <input
              className="disable"
              type="text"
              name="vName"
              value={product ? values?.vName : userData.name}
              onChange={handleValues}
              required
            />



            <input
              className="disable"
              type="text"
              name="vUid"
              value={product ? values?.vUid : userData.uid}
              onChange={handleValues}
              required
            />

            <label>Brand Name</label>
            <input type="text" name="brandName" required value={values?.brandName} onClick={handleValues} />

            {product && product?.draft === true && <div style={{ display: "flex", alignItems: "center" }} className="draft" onClick={handleDraft}>
              <input style={{ height: "18px", width: "18px", margin: "0px", padding: "0" }} checked={draft} id="draft" name="draft" type="checkbox" value={values?.draft === true ? !draft : draft} />
              <label style={{ marginLeft: "5px" }} htmlFor="draft"> {values?.draft === true ? <>Publish</> : <>Add To Draft</>} </label>
            </div> }

            {!product && <div style={{ display: "flex", alignItems: "center" }} className="draft" onClick={handleDraft}>
              <input style={{ height: "18px", width: "18px", margin: "0px", padding: "0" }} checked={draft} id="draft" name="draft" type="checkbox" value={values?.draft === true ? !draft : draft} />
              <label style={{ marginLeft: "5px" }} htmlFor="draft"> {values?.draft === true ? <>Publish</> : <>Add To Draft</>} </label>
            </div>}
            

          </div>
        </div>

        <div className="formButton">
          <button>Submit</button>
        </div>

      </form>
    </>
  );
};

export default ModalData;
