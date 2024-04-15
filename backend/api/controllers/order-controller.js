const orderService = require("../services/order-service");
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders(req, res);
    if (orders) {
      res.json(orders);
    } else {
      res.status(404).send({ message: "Orders not found" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: "An error occurred while fetching the orders" });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await orderService.getUserOrders(req, res);
    if (orders) {
      res.json(orders);
    } else {
      res.status(404).send({ message: "Orders not found" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: "An error occurred while fetching the orders" });
  }
};
