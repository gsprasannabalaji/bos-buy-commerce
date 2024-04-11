const productRoute = require("./product-route");
const stripeRouter = require("./stripe-route");

module.exports = function (app) {
  app.use("/product", productRoute);
  app.use("/stripe", stripeRouter);
};
