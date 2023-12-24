const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Shop = require("../modal/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const Product = require("../modal/product");
const { isShopAuthenticated } = require("../middlewares/auth");
const Event = require("../modal/event");
const CouponCode = require("../modal/couponCode");

// create coupon code
router.post(
  "/create-couponCode",isShopAuthenticated, 
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name } = req.body;
      //check if couponCode is already declared or not
      const isCouponCodeExists = await CouponCode.find({ name});

      console.log(req.body);
      console.log("isCouponCodeExists", isCouponCodeExists);
      if (isCouponCodeExists.length!==0) {
        return next(new ErrorHandler("Coupon code already exist", 400));
      }
      // now create coupon code
      const couponCodeData = req.body;

      const couponCode = await CouponCode.create(couponCodeData);

      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete couponCode
router.delete(
  "/delete-couponCode/:id",
  isShopAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    // get the product id from  params
    const { id } = req.params;
    // find  and delete this product
    try {
      const deletedCouponCode = await CouponCode.findByIdAndDelete(id);

      if (!deletedCouponCode) {
        return next(new ErrorHandler("CouponCode  not found to delete", 500));
      }

      res.status(200).json({
        message: "Coupon code  deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// get all couponCode
router.get(
  "/get-all-couponCode/:shopId",isShopAuthenticated, 
  catchAsyncErrors(async (req, res, next) => {
    try {
      // get the shop id from param
      const { shopId } = req.params;
      // make a requet to the coupon collection wtih this shop id
      const couponCodes = await CouponCode.find({ shopId });
      res.status(200).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

module.exports = router;
