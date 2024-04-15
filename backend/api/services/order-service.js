const Order = require("../models/orders");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ date: -1 });
    return orders;
  } catch (err) {
    throw err;
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userEmail = req?.userEmail;
    const orders = await Order.find({ email: userEmail }).sort({ date: -1 });
    return orders;
  } catch (err) {
    throw err;
  }
};
