const express = require("express");
const ErrorHandler = require("./middlewares/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
// const fileUpload= require("express-fileupload")

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  
  credentials: true,
}));
app.use(cookieParser()); 
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload({useTempFiles:true}))
 
 
const user = require("./controllers/user");
const shop = require("./controllers/shop");
const product = require("./controllers/product");
app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);

// ErrorHandling
app.use(ErrorHandler);

module.exports = app;
