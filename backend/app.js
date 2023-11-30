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
 
//config
if (process.env.NODE_ENV != "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}
const user = require("./controllers/user");
app.use("/api/v2/user", user);

// ErrorHandling
app.use(ErrorHandler);

module.exports = app;
