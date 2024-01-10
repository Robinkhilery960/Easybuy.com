const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User= require("../modal/user");
const Shop = require("../modal/shop");

exports.isAuthenticated = catchAsyncErrors(async(req, res, next) => {
  //extract token from cookies
  try {
    const { token } = req.cookies;
    console.log("i am called  from isAuthenticated", token);

    // if token valid
    if (!token) {
      return next(new Error("Please login", 500));
    }
    
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
     req.user= await User.findById(payload.id).select("+password")
     next()
} catch (error) { 
    return next(new Error(error.message, 500));
  }
});
exports.isShopAuthenticated = catchAsyncErrors(async(req, res, next) => {
  //extract token from cookies
  try {
    const { sellerToken } = req.cookies;

    // if token valid
    if (!sellerToken) {
      return next(new Error("Please login to your shop", 500));
    }
    
    const payload = jwt.verify(sellerToken, process.env.JWT_SECRET_KEY);
     req.shop= await Shop.findById(payload.id)
     next()
} catch (error) { 
    return next(new Error(error.message, 500));
  }
});
