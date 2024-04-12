const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');

router.get('/search', productController.searchName);
router.post("/create", productController.create);
router.delete("/delete/:id", productController.delete);
router.get('/getTopProducts', productController?.getTopProducts);
router.get('/:id', productController.search);

module.exports = router;