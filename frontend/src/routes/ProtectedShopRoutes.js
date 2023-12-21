import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../Components/layout/Loader";

const ProtectedShopRoute = ({ children }) => {
  const { isShopAuthenticated, isShopLoading } = useSelector(
    (state) => state.shop
  );
  if (isShopLoading === true) {
    return <Loader />;
  } else {
    if (!isShopAuthenticated) {
      return <Navigate to="/login-shop" replace />;
    }
    return children;
  }
};
export default ProtectedShopRoute;
