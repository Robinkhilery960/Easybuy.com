const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const shopSchema = new mongoose.Schema({
  name: { type: String, require: [true, "Please Enter a shop name "] },
  email: {
    type: String,
    require: [true, "Please enter your shop email"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Please Enter your password"],
    select: false,
    minLength: [8, "You password should be greater than 8 character"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please Enter phone number"],
  },
  address: {
    type: String,
    required:[true, "Plesase enter your shop address"]
  },
  description: {
    type: String,
  },
  role: { type: String, default: "Seller" },
  zipCode: { type: Number, required: [true, "Please enter your zip code"] },
  avatar: String,
  createdAt: { type: Date, default: Date.now() },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

// Hasing of password
shopSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT create
shopSchema.methods.getJwtToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare passwords
shopSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Shop", shopSchema);
