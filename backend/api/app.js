const express = require("express");

const initializeRoutes = require("./routes/index");
const mongoose = require("mongoose");
const path = require("path");
const dotenv =require('dotenv');

dotenv.config();

const dbURI=process.env.dbURi;
mongoose.connect(dbURI);

const cors = require("cors");

const initialize = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    "/assets/productImages",
    express.static(path.join(__dirname, "../assets/productImages"))
  );
  app.use(cors({ origin: true, credentials: true }));
  initializeRoutes(app);
};

module.exports = initialize;
