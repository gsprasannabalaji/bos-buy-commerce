const express= require('express');

const initializeRoutes =require( "./routes/index.js");

// import mongoose from "mongoose";

// import path from "path";

const cors =require('cors');



const initialize = (app) => {

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));


 app.use(cors({ origin: true, credentials: true }));

 //mongoose.connect(process.env.MONGO_URL);

 initializeRoutes(app);

}



module.exports = initialize;