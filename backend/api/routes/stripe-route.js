const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripe-controller');

router.route("/create-checkout-session").post(stripeController.stripePayment);

module.exports = router;