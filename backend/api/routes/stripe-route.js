const express = require("express");
const router = express.Router();
const stripeController = require("../controllers/stripe-controller");
const authenticateToken = require("../middlewares/authenticateToken");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router
  .route("/create-checkout-session")
  .post(authenticateToken, stripeController?.stripePayment);

router.get("/orders", stripeController?.createOrder);
router.get("/updateOrder", stripeController?.updateOrder);

module.exports = router;
