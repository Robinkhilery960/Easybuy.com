const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Shop = require("../modal/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const Product = require("../modal/product");
const Order = require("../modal/order");
const cloudinary = require("cloudinary").v2;
const {
  isShopAuthenticated,
  isAuthenticated,
  isAdmin,
} = require("../middlewares/auth");
const fs = require("fs");

// create product

router.post(
  "/create-product",
  catchAsyncErrors(async (req, res, next) => {
    // getting data from frontend
    try {
      const { shopId, images } = req.body; 
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("shopId is invalid", 404));
      }
      // now we will create a product for this shop
      const productData = req.body;
      productData.shop = shop;
      const imgArr = [];
      for (let i = 0; i < images.length; i++) {
        const mycloud = await cloudinary.uploader.upload(images[i], {
          folder: "productImages",
        });
        imgArr.push({
          public_id: mycloud.public_id,
          url: mycloud.secure_url,
        });
      }
      console.log("imgArr", imgArr);
      productData.images = imgArr;
      const product = await Product.create(productData);
      res.status(200).json({
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// delete product---user
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

// create review
router.put(
  "/create-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;
      // find the product
      let product = await Product.findById(productId);
      if (!product) {
        return next(new ErrorHandler("Product not found with this Id", 500));
      }
      if (product.reviews) {
        let review = product.reviews.find(
          (review) => review.user._id === user._id
        );
        // gave review by this user
        if (review) {
          review.rating = rating;
          review.comment = comment;
          review.productId = productId;
        } else {
          // review is not given by this user
          product.reviews.push({
            user,
            rating,
            comment,
            productId,
          });
        }
      } else {
        product.reviews = [
          {
            user,
            rating,
            comment,
            productId,
          },
        ];
      }
      // add ratings
      let ratings =
        product.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
        product.reviews.length;
      product.ratings = ratings;
      await product.save({ validateBeforeSave: false });
      // upadte the order
      await Order.findByIdAndUpdate(
        orderId,
        {
          $set: { "cart.$[elem].isReviewed": true },
        },
        {
          arrayFilters: [{ "elem._id": productId }],
        }
      );
      res.status(200).json({
        success: true,
        message: "Reviwed successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// delete product---Admin
router.delete(
  "/delete-product/:id",
  isShopAuthenticated,
  isAdmin("Admin"),
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

module.exports = router;
