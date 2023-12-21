import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShopHomePage, ShopDashboardPage } from "./routes/ShopRoutes.js";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailPage,
  ProfilePage,
  CheckoutPage,
  CreateShopPage,
  SellerActivationPage,
  LoginShopPage,
} from "./routes/Routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { server } from "./server.js";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/slice/user.js";
import ProtectedRoute from "./routes/ProtectedRoute.js";
import { loadShop } from "./redux/slice/shop.js";
import ProtectedShopRoute from "./routes/ProtectedShopRoutes.js";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadShop());
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />

          <Route path="/product/:name" element={<ProductDetailPage />} />
          <Route
            path="/shop/activation/:activationToken"
            element={<SellerActivationPage />}
          />
          <Route
            path="/activation/:activationToken"
            element={<ActivationPage />}
          />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Shop Routes */}

          <Route path="/create-shop" element={<CreateShopPage />} />
          <Route path="/login-shop" element={<LoginShopPage />} />
          <Route
            path="/shop/:shopId"
            element={
              <ProtectedShopRoute>
                <ShopHomePage />
              </ProtectedShopRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedShopRoute>
                <ShopDashboardPage />
              </ProtectedShopRoute>
            }
          />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </>
  );
};

export default App;
