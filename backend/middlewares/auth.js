const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User= require("../modal/user");
const Shop = require("../modal/shop");
const ErrorHandler = require("../utils/ErrorHandler");

exports.isAuthenticated = catchAsyncErrors(async(req, res, next) => {
  //extract token from cookies
  try {
    console.log("tokne", req.cookies)
    const { token } = req.cookies;
    console.log("i am called  from isAuthenticated", token);

    // if token invalid
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
      return next(new ErrorHandler("Please login to your shop", 500));
    }
    
    const payload = jwt.verify(sellerToken, process.env.JWT_SECRET_KEY);
     req.shop= await Shop.findById(payload.id)
     next()
} catch (error) { 
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.isAdmin=(...roles)=>{
  console.log(roles)
  return (req, res, next)=>{
    if(!roles.includes(req.user.role)){
      return next(new Error(`${req.user.role} is not allowed to access this resource`, 500)); 
    }
    next()
  }
}