const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();
const Order = require("../modal/order");

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

module.exports = router;
