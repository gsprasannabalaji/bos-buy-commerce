const stripeService = require("../services/stripe-service");

exports.stripePayment = async (req, res) => {
    try {
        const sessionUrl = stripeService?.makePayments(req);
        res.send({ url: sessionUrl });
    } catch(error) {
        res.status(500).send({ message: 'An error occurred in payement service' });
    }
}