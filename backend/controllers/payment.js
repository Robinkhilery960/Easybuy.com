const express = require("express");
const { config } = require("../config/index");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const stripe = require("stripe")(config.STRIPE_SECRET_KEY);

const router = express.Router();

router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
          company: "MyCompany",
        }, 
        description: "$5 for 5 credits",
        shipping: {
          name: "Customer Name",
          address: {
            line1: "Customer Address",
            city: "Customer City",
            country: "US",
            postal_code: "12345",
          },
        },
      });

      res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  })
);

module.exports = router;
