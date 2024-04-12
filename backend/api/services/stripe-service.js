const Stripe = require("stripe");
const dotenv = require('dotenv');
dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

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
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: "payment",
    invoice_creation: {
      enabled: true,
    },
    success_url: "http://localhost:5173/Orders",
    cancel_url: "http://localhost:5173/cart",
  });

  return session?.url;
};
