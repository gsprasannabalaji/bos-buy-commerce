const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/search', productController.searchName);
router.get('/getTopProducts', productController?.getTopProducts);
router.get('/:id', productController.search);

module.exports = router;