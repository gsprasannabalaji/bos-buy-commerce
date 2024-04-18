const express = require("express");

const initializeRoutes = require("./routes/index");
const mongoose = require("mongoose");
const path = require("path");
const dotenv =require('dotenv');
const cookieParser = require("cookie-parser");
// Load environment variables from .env file
dotenv.config();
// Get the MongoDB URI from environment variables
const dbURI=process.env.dbURi;
// Connect to MongoDB using Mongoose
mongoose.connect(dbURI);

const cors = require("cors");
// Function to initialize Express app
const initialize = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    "/assets/productImages",
    express.static(path.join(__dirname, "../assets/productImages"))
  );
  app.use(cors({ origin: true, credentials: true }));
  initializeRoutes(app);
};
// Export the initialize function
module.exports = initialize;
