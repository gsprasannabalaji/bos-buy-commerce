const Product = require("../models/product");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

exports.search = async (id) => {
  try {
    const product = await Product.findOne({ productId: id.trim() });
    return product;
  } catch (err) {
    throw err;
  }
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'assets/productImages');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

exports.create = async (req, res) => {
  await upload.single("file")(req, res, async (err) => {
    if (!req.file) {
      console.log("print file");
      return res.status(400).json({
        message: "Missing required fields: Image File",
      });
    }
    const pathfile = `http://localhost:3000/user/${req.file.filename}`;
    const productId = new mongoose.Types.ObjectId();
    try {
      const value = new Product({
        productName: req.body.name,
        description: req.body.description,
        price: req.body.price,
        rating: req.body.rating,
        productId: productId,
        imageURL: pathfile,
      });
      await value.save();
      return {
        message: "Namma Jaichitom Maara",
      };
    } catch (err) {
      console.log(err);
    }
  });
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
