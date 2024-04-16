const productService = require("../services/product-service");

exports.search = async (req, res) => {
  try {
    const { id } = req.params;
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
      .send({ message: "An error occurred while creating the product" });
  }
};

exports.create = async (req, res, next) => {
  try {
    const uploadResponse = await productService.create(req, res, next);
    if (uploadResponse.status === 404) {
      res.status(404).send({ message: "Error Occured" });
    } else {
      res.json(uploadResponse);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: "An error occurred while fetching the product" });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await productService.delete(id);
    if (deleteData?.status === 404) {
      res.status(404).send({ message: "No product found with that ID" });
    } else {
      res.json(deleteData);
    }
  } catch (err) {
    console.error(err);
    res
      .status(404)
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

exports.getTopProducts = async (req, res) => {
  try {
    const products = await productService.getRandomLaptopProducts(req, res);
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .send({ message: "An error occurred while fetching the product" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const response = await productService.getAll(req, res);
    res.json(response);
  } catch (err) {
    res
      .status(500)
      .send({ message: "An error occurred while fetching the product" });
  }
};

exports.edit = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try{
    const response = await productService.edit(id, data);
    if (response.status === 404) {
      res.status(404).send({ message: "No product found with that ID" });
    } else {
      res.json({ message: "Product updated successfully", product: data });
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "An error occurred while editing the product" });
  }
};

exports.searchCategory = async (req, res) => {
  try {
    const category = req.query.category;
    const products = await productService.searchByCategory(category);
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .send({ message: "An error occurred while fetching the product" });
  }
};