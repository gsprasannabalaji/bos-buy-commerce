const express = require("express");
const router = express.Router();
const stripeController = require("../controllers/stripe-controller");
const authenticateToken = require("../middlewares/authenticateToken");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// Route to create checkout session
router
  .route("/create-checkout-session")
  .post(authenticateToken, stripeController?.stripePayment);
// Route to get orders
router.get("/orders", stripeController?.createOrder);
// Route to update order
router.get("/updateOrder", stripeController?.updateOrder);

module.exports = router;
