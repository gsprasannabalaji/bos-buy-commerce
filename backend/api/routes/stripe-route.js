const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripe-controller');

router.route("/create-checkout-session").post(stripeController.stripePayment);
router.route("/payments/successful").get(stripeController.getSuccessfulPayments);


module.exports = router;