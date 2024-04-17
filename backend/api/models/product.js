const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const previewImagesSchema = new Schema({
  filename: {
    type: String,
  },
  path: {
    type: String,
  },
});

const productSchema = new Schema(
  {
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
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    previewImages: [previewImagesSchema],
  },
  { collection: "Productlist" }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
