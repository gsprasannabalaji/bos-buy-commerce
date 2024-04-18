const Stripe = require("stripe");
const dotenv = require("dotenv");
const Order = require("../models/orders");
const mongoose = require("mongoose");
dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createOrder = async (req, res) => {
  try {
    const orderId = new mongoose.Types.ObjectId();
    const { cartItems = [] } = req?.body;
    const products = cartItems.map((item) => ({
      productId: item?.id,
      quantity: item?.quantity,
      productName: item?.name,
      price: item?.price,
      imageURL: item?.imageURL,
      description: item?.description,
    }));

    const newOrder = new Order({
      orderId,
      totalPrice: 0,
      products: products,
      shippingAddress: null,
    });

    await newOrder.save();

    return orderId;
  } catch (err) {
    throw err;
  }
};

exports.updateOrder = async (req) => {
  const { order_id: orderId, session_id } = req?.query;

  try {
    const session = await stripe?.checkout?.sessions?.retrieve(session_id);
    const customer = await stripe?.customers?.retrieve(session?.customer);
    const paymentIntent = await stripe?.paymentIntents.retrieve(
      session?.payment_intent
    );

    const order = await Order?.findOne({ orderId: orderId });

    const {
      email = "",
      shipping: { address: shippingAddress = null },
    } = customer;
    let updatedObj = {
      orderId,
      totalPrice: paymentIntent?.amount / 100,
      products: order?.products,
      shippingAddress: shippingAddress,
      email: email,
    };
    await Order.findOneAndUpdate({ orderId: orderId }, updatedObj, {
      new: true,
    });
    return "http://localhost:5173/orders?payment=done";
  } catch (err) {
    throw err;
  }
};

exports.makePayments = async (req) => {
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
  const orderId = await createOrder(req);
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
    success_url: `${process.env.DOMAIN_URL}/stripe/updateOrder?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
    cancel_url: "http://localhost:5173/cart",
  });

  return session?.url;
};
