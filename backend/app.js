const express = require("express");
const ErrorHandler = require("./middlewares/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
// const fileUpload= require("express-fileupload")

app.use(express.json({ limit: '10mb' }));
app.use(
  cors({
    origin: "https://easybuy-com-frontend-two.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "./uploads")));
app.use(bodyParser.urlencoded({ extended: true,  limit: '10mb' }));
// app.use(fileUpload({useTempFiles:true}))
app.use("/test", (req, res) => {
  res.send("Hello world!");
});
const user = require("./controllers/user");
const shop = require("./controllers/shop");
const product = require("./controllers/product");
const event = require("./controllers/event");
const couponCode = require("./controllers/couponCode");
const payment = require("./controllers/payment");
const order = require("./controllers/order");
app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/couponCode", couponCode);
app.use("/api/v2/payment", payment);
app.use("/api/v2/order", order);

// ErrorHandling
app.use(ErrorHandler);

module.exports = app;
