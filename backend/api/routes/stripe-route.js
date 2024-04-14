const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripe-controller');
const authenticateToken = require('../middlewares/authenticateToken');
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.route("/create-checkout-session").post(authenticateToken, stripeController?.stripePayment);

router.get('/orders', async (req, res) => {
    let { order, session_id } = req.query;
    try {
        const session = await stripe?.checkout?.sessions?.retrieve(session_id);
        const customer = await stripe?.customers?.retrieve(session?.customer);

        // TODO - saving the orders logic will be handled here.

        res.redirect("http://localhost:5173/Orders?payment=done");
    } catch (err) {
        console.log(err);
        res.redirect("http://localhost:5173/cart");
    }
});

module.exports = router;