const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("./product");

const shippingAddressSchema = new Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  line1: { type: String, required: true },
  line2: { type: String },
  postal_code: { type: String, required: true },
  state: { type: String, required: true },
});
const productItemSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
});


const orderSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    products: [productItemSchema],
    shippingAddress: shippingAddressSchema,
  },
  {
    collection: "Orders",
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
