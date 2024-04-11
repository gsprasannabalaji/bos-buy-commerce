const productService = require("../services/productservice");

exports.search = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const product = await productService.search(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: "An error occurred while fetching the product" });
  }
};
exports.create = async (req, res, next) => {
  try {
    const uploadResponse = await productService.create(req, res, next);
    res.json(uploadResponse);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: "An error occurred while fetching the product" });
  }
};
exports.searchName = async (req, res) => {
  try {
    const title = req.query.name;
    const product = await productService.searchByName(title);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: "No products found" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: "An error occurred while fetching the product" });
  }
};
