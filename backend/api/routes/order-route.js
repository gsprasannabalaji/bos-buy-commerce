const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controller');
const authenticateToken = require('../middlewares/authenticateToken');
// Defining routes for handling order-related requests
// Route for retrieving all orders
router.get('/getAllOrders', orderController.getAllOrders);
// Route for retrieving orders associated with a user
router.get('/getUserOrders', authenticateToken, orderController.getUserOrders);

module.exports = router;