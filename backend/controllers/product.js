const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Shop = require("../modal/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const Product = require("../modal/product");

// create product

router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    // getting data from frontend
    try {
      const { shopId } = req.body;
      const shop = await Shop.findById(shopId);
      if(!shop){
        return next(new ErrorHandler("shopId is invalid", 404)) 
      }else{
            // now we wil create a product for this shop 
            const productData= req.body
            productData.shop=shop 
            const imageUrls= req.files.map(file=>`${file.filename}`)
            productData.images=imageUrls 
            const product= await Product.create(productData)
            res.status(200).json({ 
                message:"Product created successfully",
                product
            })  
      }
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
  })
);

module.exports = router;
