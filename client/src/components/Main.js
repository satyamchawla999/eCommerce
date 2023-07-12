import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, Signin, Signup, Profile } from "./";
import { Header, ProductPage } from "./subComponents";

const Page404 = () => {
  return <h1>404 not found</h1>;
};

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  return user ? <Navigate to="/" /> : <>{children}</>;
};

const Main = () => {
  return (
    <div className="Main">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productpage/:id" element={<ProductPage />} />

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
                <Profile />
            }
          />

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Main;
