const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Shop = require("../modal/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const Product = require("../modal/product");
const { isShopAuthenticated } = require("../middlewares/auth");
const fs = require("fs");

// create product

router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    // getting data from frontend
    try {
      const { shopId } = req.body;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("shopId is invalid", 404));
      } else {
        // now we wil create a product for this shop
        const productData = req.body;
        productData.shop = shop;
        const imageUrls = req.files.map((file) => `${file.filename}`);
        productData.images = imageUrls;
        const product = await Product.create(productData);
        res.status(200).json({
          message: "Product created successfully",
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// delete product
router.delete(
  "/delete-product/:id",
  isShopAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    // get the product id from  params
    const { id } = req.params;
    // find  and delete this product
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      console.log("deletedProduct", deletedProduct);
      if (!deletedProduct) {
        return next(new ErrorHandler("Product not found to delete", 500));
      }

      deletedProduct.images.forEach((image) => {
        const filePath = `uploads/${image}`;
        console.log(filePath);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log("Deletion of file is done");
          }
        });
      });

      res.status(200).json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// get all products of a shop
router.get(
  "/get-all-products/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // get the shop id from param
      const { shopId } = req.params;
      console.log("i am called from get all products");
      // make a requet to the product collection wtih this shop id
      const products = await Product.find({ shopId });
      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// get all products of all shops

router.get(
  "/get-all-shops-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const allProducts = await Product.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        allProducts,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);
module.exports = router;
