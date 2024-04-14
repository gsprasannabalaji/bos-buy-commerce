const stripeService = require("../services/stripe-service");

exports.stripePayment = async (req, res) => {
    try {
        const sessionUrl = await stripeService?.makePayments(req);
        res.send({ url: sessionUrl });
    } catch(error) {
        res.status(500).send({ message: 'An error occurred in payement service' });
    }
}

exports.createOrder = async (req, res) => {
    try {
        const redirectUrl = await stripeService?.createOrder(req, res);
        res.redirect(redirectUrl);
    } catch(error) {
        res.redirect("http://localhost:5173/cart");
    }
}