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
const { isAuthenticated, isAdmin } = require("../middlewares/auth.js");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  // data extraction from  request
  const { name, email, password } = req.body;

  if (!(name && email && password)) {
    return next(new ErrorHandler("A field is left blank plase fill it ", 400));
  }

  //check password length
  if (password.length < 8) {
    return next(
      new ErrorHandler(
        "You password is should be 8 character long or more  ",
        400
      )
    );
  }
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
      console.log("activeation is called");
      // compare the activation token
      const userData = await jwt.verify(
        activationToken,
        process.env.ACTIVATION_SECRET_KEY
      );

      if (!userData) {
        return next(new ErrorHandler("Token is invalid", 400));
      }

      // check if the user   already exist or not with the email id
      const userFound = await User.findOne({ email: userData.email });
      if (userFound) {
        return next(new ErrorHandler("User Already exist", 400));
      }

      const { name, email, password, avatar } = userData;

      // create a new user in Databse
      const user = await User.create({
        name,
        email,
        password,
        avatar,
      });

      //  create and send Token to frontend
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    //get data from client
    const { email, password } = req.body;
    if (!(email && password)) {
      return next(new ErrorHandler("Plase provide email and password ", 400));
    }

    //check user in database
    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(
          new ErrorHandler("User not found, Please create your account ", 400)
        );
      }

      // comapre password
      const isPasswordValid = await user.comparePassword(password);
      console.log(isPasswordValid);
      if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid credentials", 400));
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log("i am called from getuser ", req.user);
      if (!req.user) {
        return next(new ErrorHandler("User does not exist please signup", 400));
      }
      res.status(201).json({
        success: true,
        user: req.user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/logout",
  isAuthenticated,
  catchAsyncErrors(async (req, res) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user
router.put(
  "/updateuser",
  isAuthenticated,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, email, password, phoneNumber } = req.body;
      // does user exist already
      let user = req.user;
      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      //compare password
      const doesPasswordMatched = await user.comparePassword(password);
      if (!doesPasswordMatched) {
        return next(new ErrorHandler("Invalid credentials", 400));
      }

      user.name = name;
      user.phoneNumber = phoneNumber;
      // remove the upload image in upload directory
      if (user) {
        const filename = user.avatar;
        const filePath = `uploads/${filename}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log("Deletion of file is done");
          }
        });
      }
      const filename = req.file.filename;
      const fileUrl = path.join(filename);
      console.log(fileUrl);

      // make a new user
      user.avatar = fileUrl;

      await user.save();

      res.status(201).json({
        success: true,
        message: "User updated successful!",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user addrress
router.put(
  "/update-user-address",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = req.user;
      // if that address already exist
      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );

      if (sameTypeAddress) {
        return next(
          new ErrorHandler(`${req.body.addressType} address already exist`)
        );
      }

      user.addresses.push(req.body);

      await user.save();

      res.status(201).json({
        success: true,
        message: "User address updated successful!",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete address
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    //recieve address from frontend

    // check does the user exist
    try {
      const user = req.user;
      const addressId = req.params.id;
      const newUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { addresses: { _id: addressId } } },
        { new: true }
      );

      res.status(201).json({
        success: true,
        message: "Address deleted successfully !!",
        user: newUser,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user password

router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    // take data from frontend
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    if (newPassword !== confirmNewPassword) {
      return next(
        new ErrorHandler("Confirm Password not matched with new Password", 401)
      );
    }
    // compare current password with password stored in database
    const user = req.user;
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid Credentials", 400));
    }
    // if password matched then update the password
    user.password = newPassword;
    await user.save();

    res.status(201).json({
      success: true,
      message: "Password updated successfully !!",
      user,
    });
  })
);

// creatng activation token
function createActivationToken(user) {
  return jwt.sign({ ...user }, process.env.ACTIVATION_SECRET_KEY, {
    expiresIn: "5m",
  });
}

// get all users--- admin
router.get(
  "/getAllUsers",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const allUsers = await User.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        allUsers,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// delete user-- 
router.delete(
  "/delete-user/:id",
  isAuthenticated,
  isAdmin("Admin"), 
  catchAsyncErrors(async (req, res, next) => {
    // get the user id from  params
    const { id } = req.params;
    console.log(id);
    // find  and delete this user
    try {
      const deletedUser = await User.findByIdAndDelete(id, { new: true });
      console.log("deletedUser", deletedUser);
      if (!deletedUser) {
        return next(new ErrorHandler("User not found to delete", 500));
      }

      const filePath = `uploads/${deletedUser.avatar}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log("Deletion of file is done");
        }
      });

      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// send mail to user activate user
module.exports = router;
