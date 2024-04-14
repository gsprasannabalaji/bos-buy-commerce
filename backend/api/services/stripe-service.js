const Stripe = require("stripe");
const dotenv = require('dotenv');
const Order = require("../models/orders");
const mongoose = require("mongoose");
dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.makePayments = async (req) => {
  // console.log("print the make payment request   ");
  const line_items = req?.body?.cartItems?.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item?.name,
          Images: [item?.imageUrl],
          description: item?.description,
        },
        unit_amount: item?.price * 100,
      },
      quantity: item?.quantity,
    };
  });
console.log("print the make payment request " , req.userEmail);
  const encodedBody = encodeURIComponent(JSON.stringify(req.body));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
    ],
    customer_email: req?.userEmail,
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: "payment",
    invoice_creation: {
      enabled: true,
    },
    success_url: `http://localhost:3002/stripe/Orders?session_id={CHECKOUT_SESSION_ID}&order=${encodedBody}`,
    cancel_url: "http://localhost:5173/cart",
  });

  return session?.url;
};

exports.createOrder = async (req, res) => {
  let { order, session_id } = req.query;
  try {
    const session = await stripe?.checkout?.sessions?.retrieve(session_id);
    const customer = await stripe?.customers?.retrieve(session?.customer);
    const paymentIntent = await stripe?.paymentIntents.retrieve(
      session?.payment_intent
    );

    const orderId = new mongoose.Types.ObjectId();
    const { cartItems = [] } = JSON?.parse(order);
    console.log("printing the customers ", customer);
    const { email = "", shipping : { address : shippingAddress = null } } = customer;
    const products = cartItems?.map((item) => {
      return {
        productId: item?.id,
        productName: item?.name,
        price: item?.price,
        quantity: item?.quantity,
        imageUrl: item?.imageURL,
        description: item?.description,
        category: item?.category || "",
        stock: item?.stock || 0,
      };
    });
    try {
      const newOrder = new Order({
        orderId,
        email,
        totalPrice: paymentIntent?.amount / 100,
        // products,
      });
      await newOrder?.save();
      
      return "http://localhost:5173/Orders?payment=done";
    } catch (err) {
      throw err;
    }
  } catch (err) {
    throw err;
  }
}