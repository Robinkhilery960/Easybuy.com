const mongoose = require("mongoose");

const couponCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please enter your coupon code "],
    unique: true,
  }, 
  value: {
    type: Number,
    required: true,
  },
  minAmount: {
    type: Number,
  },
  maxAmount: {
    type: Number,
  },
  shop: {
    type: Object,
    require: true,
  },
  shopId: {
    type: String,
    require: true,
  },
  selectProduct:{
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("CouponCode", couponCodeSchema);
