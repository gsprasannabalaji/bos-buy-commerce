const express = require('express');
const router = express.Router();
const productRoute=require('./productroute');


module.exports = function(app) {
    app.use('/product', productRoute);
  };
  


