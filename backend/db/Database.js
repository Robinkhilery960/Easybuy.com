const mongoose = require("mongoose");
const { config } = require("../config");
console.log(config.DB_URL)

const connectDatabase = () => {
  mongoose.connect(config.DB_URL, {}).then((data) => {
    console.log(`mongoDB is connectd with server: ${data.connection.host}`);
  });
};

module.exports = connectDatabase;
