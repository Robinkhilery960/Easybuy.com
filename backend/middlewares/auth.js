const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User= require("../modal/user")

exports.isAuthenticated = catchAsyncErrors(async(req, res, next) => {
  //extract token from cookies
  try {
    const { token } = req.cookies;
    console.log(token);

    // if token valid
    if (!token) {
      return next(new Error("Please login", 500));
    }
    
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
     req.user= await User.findById(payload.id)
     next()
} catch (error) { 
    return next(new Error(error.message, 500));
  }
});
