const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, require: [true, "Please Enter a name "] },
  email: {
    type: String,
    require: [true, "Please enter your email"],
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
  },
  addresses: [
    {
      country: { type: String },
      state: { type: String },
      city: { type: String },
      address1: { type: String },
      address2: { type: String },
      zipCode: { type: Number },
      addressType: { type: String },
    },
  ],
  role: { type: String, default: "user" },
  avatar: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now() },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

// Hasing of password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password);
});

// JWT create
userSchema.methods.getJwtToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
