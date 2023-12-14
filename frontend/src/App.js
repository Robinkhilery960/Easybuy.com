import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  ProfilePage
} from "./Routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { server } from "./server.js";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/slice/user.js";
import ProtectedRoute from "./ProtectedRoute.js";

const App = () => {
  const { isLoading , isAuthenticated} = useSelector((state) => state.user);
  console.log(isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <>
      {isLoading ? null : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/product/:name" element={<ProductDetailPage />} />
            <Route
              path="/activation/:activationToken"
              element={<ActivationPage />}
            />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/profile" element={ 
              <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProfilePage/>
              </ProtectedRoute>
            } />
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
      )}
    </>
  );
};

export default App;
