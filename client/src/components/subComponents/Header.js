import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { logout } from "../../firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../../features/user/userSlice";
import { Link } from "react-router-dom";

import "../../assets/styles/header.scss";

const Header = () => {
  const user = useSelector((state) => state.user);
  const userData = useSelector((state) => state.userData);
  console.log(userData.imgUrl);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    await logout();
    dispatch(deleteUser());
  };

  return (
    <div className="header">
      <div className="left">
        <img
          onClick={() => setOpen(!open)}
          src={require("../../assets/images/bars.png")}
          alt="#"
        />
      </div>

      <div className="mid">
        <img
          src="https://www.snitch.co.in/cdn/shop/files/blackoption_200x@2x.png?v=1659016547"
          alt="#"
        />
      </div>

      <div className="right">
        <Link to="/profile">
          <img
            style={{ width: "30px", height: "30px" }}
            src={require("../../assets/images/account.png")}
            alt="#"
          />
        </Link>
        <img src={require("../../assets/images/heart.png")} alt="#" />
        <img src={require("../../assets/images/search.png")} alt="#" />
        <img src={require("../../assets/images/shopping-bag.png")} alt="#" />
      </div>

      {user && (
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                          <button
                            type="button"
                            className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </Transition.Child>
                      <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                        <div className="px-4 sm:px-6">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                            <div className="userInfoSideBar">
                              <img src={userData.imgUrl} alt="" />
                              <p>{userData.name}</p>
                            </div>
                          </Dialog.Title>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                          {/* Your content */}
                          <button onClick={handleLogOut}>
                            Logout{" "}
                            <i class="fa-solid fa-arrow-right-from-bracket"></i>
                          </button>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </div>
  );
};

export default Header;
