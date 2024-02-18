const express = require("express");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
