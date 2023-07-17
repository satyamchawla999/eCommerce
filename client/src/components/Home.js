import axios from "axios";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { notification, Radio } from "antd";
import { ProductItems } from "./subComponents";
import { setUserData, setUser } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../assets/styles/home.scss"

const callouts = [
  {
    name: '',
    description: 'Women Collection',
    imageSrc: require("../assets/images/women.png"),
    imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '#',
    value: "female"
  },
  {
    name: '',
    description: 'Latest Collection',
    imageSrc: 'https://i.pinimg.com/originals/c7/09/ac/c709acb1309dfcccc6aa0d67a90a316c.jpg',
    imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '#',
    value: "all"
  },
  {
    name: '',
    description: 'Men Collection',
    imageSrc: require("../assets/images/man.png"),
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
    value: "male"
  },
]

const Home = () => {
  const userData = useSelector((state) => state.userData);
  const [products, setProducts] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [role, setRole] = useState("0");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);


  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);


  useEffect(() => {
    console.log("new data", products);

    if (userData.role === "0") {
      showModal()
    }

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

  }, [role]);

  const onChange = async (e) => {

    console.log("radio checked", e.target.value);

    const data = {
      role: e.target.value,
      uid: userData?.uid,
    }

    try {

      const response = await axios.post(
        "http://localhost:8000/user/set-user-role", data
      );

      if (response.status === 201) {
        const data = { ...userData, role: response.data }
        // console.log("new data",products);
        dispatch(setUser());
        dispatch(setUserData(data));

        setRole(e.target.value);
        handleCancel()
      }
    } catch (err) {
      console.log(err);
    }

  };


  const handleClick = async (value) => {
    // e.stopPropagation();
    console.log("hey", value);
    const data = {
      category: value,
      subCategory: "All"
    }
    navigate({ pathname: "/productcollection" }, { state: data })
  }

  return (
    <>
      {userData?.role === "0" && <div>
        <Modal
          open={isModalOpen}
          footer={[]}
        >
          <div className="roleSelector">
            <img src="https://www.snitch.co.in/cdn/shop/files/blackoption_200x@2x.png?v=1659016547" />
            <p>Hey! {userData.name}</p>

            <p>Please select role to proceed further</p>

            <Radio.Group
              className="radio"
              name="role"
              onChange={onChange}
              value={role}
            >
              <Radio value={"Customer"}>Customer</Radio>
              <Radio value={"Vendor"}>Vendor</Radio>
            </Radio.Group>
          </div>

        </Modal>
      </div>}

      {contextHolder}
      <div className="bg-white-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
          <div className="mx-auto max-w-2xl py-16 sm:py-0 lg:max-w-none lg:py-10">

            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {callouts.map((callout) => (
                <div key={callout.name} className="group relative" onClick={(e) => handleClick(callout.value)}>
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <a href={callout.href}>
                      <span className="absolute inset-0" />
                      {callout.name}
                    </a>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">
                    {callout.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="mostTrending">MOST TRENDING</p>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products && products?.map((product) => (
              product.vUid !== userData.uid && product.draft === false && <ProductItems product={product} />
            ))}

          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
