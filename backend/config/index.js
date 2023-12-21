const dotenv = require("dotenv");

dotenv.config();

exports.config = {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRES: process.env.JWT_EXPIRES || "7d",
  DB_URL: process.env.DB_URL,
  ACTIVATION_SECRET_KEY: process.env.ACTIVATION_SECRET_KEY,
  PORT: process.env.PORT,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMPT_MAIL: process.env.SMPT_MAIL,
  SMPT_PASSWORD: process.env.SMPT_PASSWORD,
  SMPT_SERVICE: process.env.SMPT_SERVICE,
};
