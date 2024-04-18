const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');
// Defining routes for handling product-related requests
// Route for searching products by name
router.get('/search', productController.searchName);
// Route for creating a new product
router.post("/create", productController.create);
// Route for deleting a product by ID
router.delete("/delete/:id", productController.delete);
// Route for retrieving top products
router.get('/getTopProducts', productController?.getTopProducts);
// Route for searching products by category
router.get('/category', productController.searchCategory);
// Route for retrieving all products
router.get('/getAll', productController.getAll);
// Route for editing a product by ID
router.put('/edit/:id', productController.edit);
// Route for searching a product by ID
router.get('/:id', productController.search);

module.exports = router;