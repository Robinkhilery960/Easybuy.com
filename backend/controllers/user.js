const express = require("express");
const path = require("path");
const User = require("../modal/user");
const router = express.Router();
const { upload } = require("../multer");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/jwtToken.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  // data extraction from  request
  const { name, email, password } = req.body;

  try {
    const userEmail = await User.findOne({ email });
    // if user already exist
    if (userEmail) {
      // remove the upload image in upload directory
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log("Deletion of file is done");
        }
      });
      return next(new ErrorHandler("User already exist", 400));
    }
    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    console.log(fileUrl);

    // make a new user
    const user = { name, email, password, avatar: fileUrl };
    console.log(user);

    //create an activation token using jwt
    const actvationToken = createActivationToken(user);
    const activationUrl = `http://localhost:3000/activation/${actvationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name} please click on the link to actvate your account ${activationUrl}`,
      });

      res.status(201).json({
        message: `Plase check your ${user.email} to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activationToken } = req.body;

      // compare the activation token
      console.log(process.env.ACTIVATION_SECRET_KEY);
      const newUser = await jwt.verify(
        activationToken,
        process.env.ACTIVATION_SECRET_KEY
      ); 
      
      if (!newUser) { 
        return next(new ErrorHandler("Token is invalid", 400));
      }

      // check if the user   already exist or not with the email id
      const user = await User.findOne({email:newUser.email });
      if (user) {
        return next(new ErrorHandler("User Already exist", 400));
      }
      
      const { name, email, password, avatar } = newUser;
      console.log("user", user)
      // create a new user in Databse
      await User.create({
        name,
        email,
        password,
        avatar,
      });

      //  create and send Token to frontend
      sendToken(newUser, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// creatng activation token
function createActivationToken(user) {
  return jwt.sign({ ...user }, process.env.ACTIVATION_SECRET_KEY, {
    expiresIn: "5m",
  });
}

// send mail to user activate user
module.exports = router;
