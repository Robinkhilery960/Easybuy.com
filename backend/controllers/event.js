const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Shop = require("../modal/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const { isShopAuthenticated, isAdmin } = require("../middlewares/auth");
const Event = require("../modal/event");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

// create event

router.post(
  "/create-event",
  catchAsyncErrors(async (req, res, next) => {
    // getting data from frontend
    try {
      const { shopId, images } = req.body;
      const shop = await Shop.findById(shopId);
      console.log(shop);
      if (!shop) {
        return next(new ErrorHandler("shopId is invalid", 404));
      }
      // now we wil create a event  for this shop
      const eventData = req.body;
      eventData.shop = shop;
      const imgArr = [];
      for (let i = 0; i < images.length; i++) {
        const mycloud = await cloudinary.uploader.upload(images[i], {
          folder: "eventImages",
        });
        imgArr.push({
          public_id: mycloud.public_id,
          url: mycloud.secure_url,
        });
      }
      eventData.images = imgArr;
      console.log(eventData);
      const event = await Event.create(eventData);
      res.status(200).json({
        message: "Event created successfully",
        event,
      });
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

// get all events of a shop
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

// all the events  of all shop

router.get(
  "/get-all-shops-events",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const totalEvents = await Event.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        totalEvents,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
