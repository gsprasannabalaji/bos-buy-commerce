const productRoute = require("./product-route");
const stripeRouter = require("./stripe-route");
const userRouter = require("./user-route");
const orderRoute = require("./order-route");

module.exports = function (app) {
  // Mounting the product route handler under the '/product' endpoint
  app.use("/product", productRoute);
  // Mounting the stripe route handler under the '/stripe' endpoint
  app.use("/stripe", stripeRouter);
  // Mounting the user route handler under the '/user' endpoint
  app.use('/user', userRouter);
  // Mounting the order route handler under the '/order' endpoint
  app.use('/order', orderRoute);
};
