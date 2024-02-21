const express = require("express");
const { isAuthenticated, isShopAuthenticated } = require("../middlewares/auth");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();
const Order = require("../modal/order");
const Product = require("../modal/product");

// create order
router.post(
  "/create-order",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;
      // sperate
      const shopItemsMap = new Map();
      for (const item of cart) {
        if (!shopItemsMap.has(item.shopId)) {
          shopItemsMap.set(item.shopId, []);
        }
        shopItemsMap.get(item.shopId).push(item);
      }
      // create an order for individual shop
      const orders = [];
      for (const [shopId, items] of shopItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all shop orders
router.get(
  "/get-all-orders/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // get the shop id from param
      const { shopId } = req.params;
      console.log("i am called from get all orders");
      // make a requet to the product collection wtih this shop id
      const orders = await Order.find({ "cart.shopId": shopId }).sort({
        createdAt: -1,
      });
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// get all user orders
router.get(
  "/get-all-user-orders/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // get the shop id from param
      const { userId } = req.params;
      console.log("i am called from get all user orders");
      // make a requet to the product collection wtih this shop id
      const orders = await Order.find({ "user._id": userId }).sort({
        createdAt: -1,
      });
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// update order status of order
router.post(
  "/update-order-status/:orderId", isShopAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { status } = req.body;
      //find order
      const order = await Order.findById(req.params.orderId);
      if (!order) {
        return next(new ErrorHandler("Order not found", 500));
      }

      const updateProduct = async (itemId, itemQty) => {
        const product = await Product.findById(itemId);
        product.stock = product.stock - itemQty;
        product.sold_out = product.sold_out + itemQty;
        await product.save({ validateBeforeSave: false });
      };

      if (status === "Transferred to delivery partner") {
        order.cart.forEach(async (item) => {
          await updateProduct(item._id, item.qty);
        });
      }

      if (status === "Delivered") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
      }

      order.status = status;
      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        sucess: true,
        order,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

module.exports = router;
