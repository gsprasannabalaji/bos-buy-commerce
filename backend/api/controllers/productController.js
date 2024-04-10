const productService = require('../services/productservice');

exports.search = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const product = await productService.search(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send({ message: 'Product not found' });
        }
    } catch (err) {
        console.error(err); 
        res.status(500).send({ message: 'An error occurred while fetching the product' });
    }
};
exports.create = async (req, res) => {
    try {
      const product = await productService.create(req, res);
      res.json(product);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send({ message: "An error occurred while fetching the product" });
    }
  };
