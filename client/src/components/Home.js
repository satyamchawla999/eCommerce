import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProductItems } from "./subComponents";
import { notification } from "antd";
import "../assets/styles/home.scss"

const callouts = [
  {
    name: '',
    description: 'Women Collection',
    imageSrc: require("../assets/images/women.png"),
    imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '#',
  },
  {
    name: '',
    description: 'Latest Collection',
    imageSrc: 'https://i.pinimg.com/originals/c7/09/ac/c709acb1309dfcccc6aa0d67a90a316c.jpg',
    imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '#',
  },
  {
    name: '',
    description: 'Men Collection',
    imageSrc: require("../assets/images/man.png"),
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
]

const Home = () => {
  const userData = useSelector((state) => state.userData);
  const [products, setProducts] = useState([]);
  const [api, contextHolder] = notification.useNotification();

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
    {contextHolder}
      <div className="bg-white-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
          <div className="mx-auto max-w-2xl py-16 sm:py-0 lg:max-w-none lg:py-10">

            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {callouts.map((callout) => (
                <div key={callout.name} className="group relative">
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
            {products.map((product) => (
              product.vUid !== userData.uid && product.draft === false && <ProductItems product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
