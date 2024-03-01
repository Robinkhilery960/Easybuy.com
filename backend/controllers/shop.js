const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/jwtToken.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const {
  isAuthenticated,
  isShopAuthenticated,
  isAdmin,
} = require("../middlewares/auth.js");
const Shop = require("../modal/shop.js");
const Product = require("../modal/product.js");
const Event = require("../modal/event.js");
const sendShopToken = require("../utils/shopToken.js");

// create shop
router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  // data extraction from  request
  const { name, email, password, phoneNumber, zipCode, address } = req.body;

  if (!(name && email && password && phoneNumber & zipCode && address)) {
    return next(new ErrorHandler("A field is left blank please fill it ", 400));
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
    const shopEmail = await Shop.findOne({ email });

    // if shop already exist
    if (shopEmail) {
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
      return next(new ErrorHandler("Shop  already exist", 400));
    }
    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    console.log(fileUrl);

    // make a new shop
    const shop = {
      name,
      email,
      password,
      avatar: fileUrl,
      phoneNumber,
      zipCode,
      address,
    };
    console.log(shop);

    //create an activation token using jwt
    const actvationToken = createActivationToken(shop);
    const activationUrl = `https://easybuy-com-xc8k.vercel.app/shop/activation/${actvationToken}`;

    try {
      await sendMail({
        email: shop.email,
        subject: "Activate your shop",
        message: `Hello ${shop.name} please click on the link to actvate your shop ${activationUrl}`,
      });

      res.status(201).json({
        message: `Plase check your ${shop.email} to activate your shop`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// activate shop
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activationToken } = req.body;

      const newSeller = jwt.verify(
        activationToken,
        process.env.ACTIVATION_SECRET_KEY
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar, zipCode, address, phoneNumber } =
        newSeller;

      let seller = await Shop.findOne({ email });

      if (seller) {
        return next(new ErrorHandler("User already exists", 400));
      }

      seller = await Shop.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
      });

      const loginUrl = `https://easybuy-com-xc8k.vercel.app/shop/shop-login`;

      try {
        await sendMail({
          email,
          subject: "Thanks for activating shop",
          message: `Hello ${name}, Your shop is activated you can login  to yout shop by clicking here  ${loginUrl}`,
        });

        res.status(201).json({
          message: `You shop is activated`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// shop-login
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    //get data from client
    const { email, password } = req.body;
    if (!(email && password)) {
      return next(new ErrorHandler("Plase provide email and password ", 400));
    }

    //check user in database
    try {
      const shop = await Shop.findOne({ email }).select("+password");
      if (!shop) {
        return next(
          new ErrorHandler("Shop not found, Please register your  shop ", 400)
        );
      }

      // comapre password
      const isPasswordValid = await shop.comparePassword(password);
      console.log(isPasswordValid);
      if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid credentials", 400));
      }

      sendShopToken(shop, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load shop
router.get(
  "/getshop",
  isShopAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log("i am called from getshop ", req.shop);
      if (!req.shop) {
        return next(new ErrorHandler("Shop does not exist please signup", 400));
      }
      res.status(201).json({
        success: true,
        shop: req.shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// logout shop
router.get(
  "/logout",
  isShopAuthenticated,
  catchAsyncErrors(async (req, res) => {
    try {
      res.cookie("sellerToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
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

// get shop info  for preview
router.get(
  "/get-shop-info/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { shopId } = req.params;
      const shop = await Shop.findById(shopId);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// creatng activation tokens
function createActivationToken(shop) {
  return jwt.sign({ ...shop }, process.env.ACTIVATION_SECRET_KEY, {
    expiresIn: "5m",
  });
}

// update shop avatar

router.put(
  "/updateshop",
  isShopAuthenticated,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber } = req.body;
      // does user exist already
      let shop = req.shop;
      if (!shop) {
        return next(new ErrorHandler("Shop not found", 400));
      }

      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      // remove the upload image in upload directory
      if (!shop) {
        const filename = shop.avatar;
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
      shop.avatar = fileUrl;

      await shop.save();

      res.status(201).json({
        success: true,
        message: "Shop updated successful!",
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all shops
router.get(
  "/getAllShops",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const allShops = await Shop.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        allShops,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// delete a shop
router.delete(
  "/delete-shop/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    // get the user id from  params
    const { id } = req.params;
    console.log(id);
    // find  and delete this user
    try {
      const deletedShop = await Shop.findByIdAndDelete(id, { new: true });
      console.log("deletedShop", deletedShop);
      if (!deletedShop) {
        return next(new ErrorHandler("Shop not found to delete", 500));
      }

      await Product.deleteMany({ shopId: id });
      await Event.deleteMany({ shopId: id });

      res.status(200).json({
        message: "Shop deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

module.exports = router;
