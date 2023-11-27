const express = require("express");
const path = require("path");
const User = require("../modal/user");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  // data extraction from  request
  const { name, email, password } = req.body;

  const userEmail = await User.findOne({ email });
  // if user already exist
  if (userEmail) {
    return next(new ErrorHandler("User already exist", 400));
  }

  const filename=req.file.filename
  const fileUrl=path.join(filename)

  // make a new user 
  const user={name, email, password, avatar:fileUrl}

  console.log(user)
});

module.exports=router
