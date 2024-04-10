const Product = require('../models/product');

exports.search = async (id) => {
    try {
        const product = await Product.findOne({ productId: id.trim() });;
        return product; 
    } catch (err) {
        throw err; 
    }
};


exports.create = async (req,res) => {
    try {
      const value = new Product({
        productName: req.body.name,
        description: req.body.description,
        price: req.body.price,
        rating: req.body.rating,
        productId: req.body.productId,
        imageURL: req.body.imageURL,
      });
      try {
        await value.save();
        return value;
      } catch (err) {
        res.status(500).json({ status: 500, error: "Internal Server Error" });
      }
    } catch (err) {
      console.log("Hello");
      throw err;
    }
  };
