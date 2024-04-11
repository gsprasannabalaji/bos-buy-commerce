const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/search', productController.searchName);
router.post("/create", productController.create);
router.get('/getTopProducts', productController?.getTopProducts);
router.get('/:id', productController.search);

module.exports = router;