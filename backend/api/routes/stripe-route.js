const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripe-controller');
const authenticateToken = require('../middlewares/authenticateToken');

router.route("/create-checkout-session").post(authenticateToken, stripeController?.stripePayment);

module.exports = router;