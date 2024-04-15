const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controller');
const authenticateToken = require('../middlewares/authenticateToken');

router.get('/getAllOrders', orderController.getAllOrders);
router.get('/getUserOrders', authenticateToken, orderController.getUserOrders);

module.exports = router;