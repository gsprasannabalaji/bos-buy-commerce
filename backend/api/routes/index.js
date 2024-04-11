const express = require('express');
const router = express.Router();
const productRoute=require('./product-route');


module.exports = function(app) {
    app.use('/product', productRoute);
  };
  


