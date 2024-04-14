const stripeService = require("../services/stripe-service");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.stripePayment = async (req, res) => {
  try {
    const sessionUrl = await stripeService?.makePayments(req);
    res.send({ url: sessionUrl });
  } catch (error) {
    res.status(500).send({ message: "An error occurred in payement service" });
  }
};

exports.getSuccessfulPayments = async () => {
  try {
    const payments = await stripe.paymentIntents.list({
      // Adjust limit to the number of records you want to retrieve
    });

    // Filter for successful payments
    const successfulPayments = payments.data.filter(
      (payment) => payment.receipt_email === "test@gmail.com"
    );
    //console.log(successfulPayments[0].invoice);
    const invoice = await stripe.invoices.retrieve(successfulPayments[0].invoice);
    console.log(invoice);
    console.log("invoice lines print ", invoice.lines.data);
    //console.log("Retrieved successful payments:", successfulPayments); // Log successful retrieval
    return invoice;
  } catch (error) {
    console.error("Failed to retrieve payments:", error); // Log any errors
    throw error; // Rethrow the error to be caught by the controller
  }
};
