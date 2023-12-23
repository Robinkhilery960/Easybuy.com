const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Shop = require("../modal/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const Product = require("../modal/product");
const { isShopAuthenticated } = require("../middlewares/auth");
const Event = require("../modal/event");
const fs= require("fs")

// create event

router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    // getting data from frontend
    try {
      const { shopId } = req.body;
      console.log(shopId);
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("shopId is invalid", 404));
      } else {
        // now we wil create a event  for this shop
        const eventData = req.body;
        eventData.shop = shop;
        const imageUrls = req.files.map((file) => `${file.filename}`);
        eventData.images = imageUrls;
        const event = await Event.create(eventData);
        res.status(200).json({
          message: "Event created successfully",
          event,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// delete event
router.delete(
  "/delete-event/:id",
  isShopAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    // get the event id from  params
    const { id } = req.params;
    // find  and delete this event
    try {
      const deletedEvent = await Event.findByIdAndDelete(id);
      if (!deletedEvent) {
        return next(new ErrorHandler("Event not found to delete", 500));
      }

      deletedEvent.images.forEach((image) => {
        const filePath = `uploads/${image}`; 
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log("Deletion of file is done");
          }
        });
      });

      res.status(200).json({
        message: "Event deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// get all products
router.get(
  "/get-all-events/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // get the shop id from param
      const { shopId } = req.params;
      // make a requet to the even collection wtih this shop id
      const events = await Event.find({ shopId });
      res.status(200).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

module.exports = router;
