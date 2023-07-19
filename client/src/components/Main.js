import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useSelector } from "react-redux";
import { Home, Signin, Signup, Profile } from "./";
import { Header, ProductPage, AdminChat } from "./subComponents";
import Cart from "./Cart"
import CheckoutPage from "./CheckoutPage";
import ProductCollection from "./subComponents/ProductCollection";

const Page404 = () => {
  return <h1>404 not found</h1>;
};

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  return user ? <Navigate to="/" /> : <>{children}</>;
};

const ProfileRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  return !user ? <Navigate to="/signin" /> : <>{children}</>;
};

const Main = () => {
  return (
    <div className="Main">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productpage/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/productcollection" element={<ProductCollection />}/>
          <Route path="/adminchat" element={<AdminChat />}/>



          <Route
            path="/signin"
            element={
              <PrivateRoute>
                <Signin />
              </PrivateRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PrivateRoute>
                <Signup />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProfileRoute>
                <Profile />

              </ProfileRoute>
            }
          />

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Main;
