const app = require("./app");
const connectDatabase = require("./db/Database");

// Handling uncaught Exception

process.on("uncaughtException", (err) => {
  console.log(`Error :${err.message}`);
  console.log(`Shutting down the server for handling uncaught exception`);
});   

// connecting to databse 
connectDatabase()

// create server
const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT || 8000} `);
});

// unHandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`Shutting down the  server for unhandled promise rejection `);

  server.close(() => {
    process.exit(1);
  });
});
