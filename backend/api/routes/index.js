const productRoute = require("./product-route");
const stripeRouter = require("./stripe-route");
const userRouter = require("./user-route");
const orderRoute = require("./order-route");

module.exports = function (app) {
  app.use("/product", productRoute);
  app.use("/stripe", stripeRouter);
  app.use('/user', userRouter);
  app.use('/order', orderRoute);
};
