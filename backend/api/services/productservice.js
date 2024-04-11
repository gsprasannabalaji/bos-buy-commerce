const Product = require("../models/product");

exports.search = async (id) => {
  try {
    const product = await Product.findOne({ productId: id.trim() });
    return product;
  } catch (err) {
    throw err;
  }
};
exports.searchByName = async (title) => {
  try {
    const regex = new RegExp(".*" + title + ".*", "i");
    const product = await Product.find({ productName: regex });
    return product;
  } catch (err) {
    throw err;
  }
};

exports.getRandomLaptopProducts = async () => {
  try {
    const products = await Product.aggregate([{ $sample: { size: 4 } }]);
    return products;
  } catch (err) {
    throw err;
  }
};