import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ShopHomePage,
  ShopDashboardPage,
  CreateProductPage,
  AllProductsPage,
  ShopCreateEvents,
  AllEventsPage,
  ShopAllCoupons,
  ShopPreviewPage,
  AllOrdersPage,
  OrderDetailPage,
  AllOrderRefundPage,
  ShopSettingPages,
} from "./routes/ShopRoutes.js";
import {
  AdminDashboardPage,
  AdminAllOrdersPage,
  AdminAllProductsPage,
  AdminAllShopsPage,
  AdminAllEventsPage,
  AdminAllUsersPage,
  AdminWidthdrawMoneyPage,
} from "./routes/AdminRoutes.js";
import {
  UserLoginPage,
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
  PaymentPage,
  OrderSuccessPage,
  UserOrderDetailPage,
  UserOrderTrackPage,
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
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute.js";
import { loadAllProducts } from "./redux/slice/product.js";
import { loadAllEvents, loadAllShopsEvents } from "./redux/slice/event.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const App = () => {
  const [stripeApikey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();

  const getStripeApiKey = async () => {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  };
  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadShop());
    dispatch(loadAllProducts());
    dispatch(loadAllShopsEvents());
    getStripeApiKey();
  }, []);
  return (
    <>
      <BrowserRouter>
        {stripeApikey && (
          <Elements stripe={loadStripe(stripeApikey)}>
            <Routes>
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Elements>
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<UserLoginPage />} />
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
          <Route path="/product/:id" element={<ProductDetailPage />} />
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
          <Route
            path="/user/order/:orderId"
            element={
              <ProtectedRoute>
                <UserOrderDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/track/order/:orderId"
            element={
              <ProtectedRoute>
                <UserOrderTrackPage />
              </ProtectedRoute>
            }
          />

          <Route path="/order/success" element={<OrderSuccessPage />} />

          {/* Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-orders"
            element={
              <ProtectedAdminRoute>
                <AdminAllOrdersPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-products"
            element={
              <ProtectedAdminRoute>
                <AdminAllProductsPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-shops"
            element={
              <ProtectedAdminRoute>
                <AdminAllShopsPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-events"
            element={
              <ProtectedAdminRoute>
                <AdminAllEventsPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-users"
            element={
              <ProtectedAdminRoute>
                <AdminAllUsersPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-withdraw-money"
            element={
              <ProtectedAdminRoute>
                <AdminWidthdrawMoneyPage />
              </ProtectedAdminRoute>
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
            path="/shop/setting"
            element={
              <ProtectedShopRoute>
                <ShopSettingPages />
              </ProtectedShopRoute>
            }
          />
          <Route
            path="/order/:orderId"
            element={
              <ProtectedShopRoute>
                <OrderDetailPage />
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
          <Route
            path="/dashboard-create-product"
            element={
              <ProtectedShopRoute>
                <CreateProductPage />
              </ProtectedShopRoute>
            }
          />
          <Route
            path="/dashboard-products"
            element={
              <ProtectedShopRoute>
                <AllProductsPage />
              </ProtectedShopRoute>
            }
          />
          <Route
            path="/dashboard-refunds"
            element={
              <ProtectedShopRoute>
                <AllOrderRefundPage />
              </ProtectedShopRoute>
            }
          />
          <Route
            path="/dashboard-orders"
            element={
              <ProtectedShopRoute>
                <AllOrdersPage />
              </ProtectedShopRoute>
            }
          />
          <Route
            path="/dashboard-create-event"
            element={
              <ProtectedShopRoute>
                <ShopCreateEvents />
              </ProtectedShopRoute>
            }
          />
          <Route
            path="/dashboard-events"
            element={
              <ProtectedShopRoute>
                <AllEventsPage />
              </ProtectedShopRoute>
            }
          />
          <Route
            path="/dashboard-coupons"
            element={
              <ProtectedShopRoute>
                <ShopAllCoupons />
              </ProtectedShopRoute>
            }
          />
          <Route path="/shop/preview/:shopId" element={<ShopPreviewPage />} />
        </Routes>
        <ToastContainer
          position="bottom-center"
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
