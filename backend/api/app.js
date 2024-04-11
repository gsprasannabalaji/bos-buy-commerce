const express= require('express');

const initializeRoutes =require('./routes/index');
const mongoose=require('mongoose');
const { exceptionHandler } = require('./routes/exceptionHandler');

// import mongoose from "mongoose";
const dbURi='mongodb+srv://bosbuy:Welcome%401@bosbuy.u5yqb7e.mongodb.net/Bosbuy?retryWrites=true&w=majority&appName=BOSbuy';
mongoose.connect(dbURi)
// import path from "path";

const cors =require('cors');



const initialize = (app) => {

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));
  app.use(exceptionHandler)


 app.use(cors({ origin: true, credentials: true }));



 initializeRoutes(app);

}



module.exports = initialize;