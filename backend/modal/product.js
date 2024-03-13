const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please enter your product name"],
  },
  description: {
    type: String,
    require: [true, "Please enter your product description"],
  },
  category: {
    type: String,
    require: [true, "Please enter your product category"],
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    require: [true, "Please enter your product discount price "],
  },
  stock: {
    type: Number,
    require: [true, "Please enter your product stock   "],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
    },
  ],
  ratings: {
    type: Number,
  },
  shopId: {
    type: String,
    require: true,
  },

  shop: {
    type: Object,
    require: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
