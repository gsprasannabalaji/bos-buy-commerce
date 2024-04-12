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
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, file.fieldname + '-' + Date.now() + (ext === '.jpeg' || ext === '.jpg' ? ext : '.jpg'));
  }
});

const upload = multer({ storage: storage });

exports.create = async (req, res) => {
  await upload.single("file")(req, res, async (err) => {
    if (!req.file) {
      return res.status(400).json({
        message: "Missing required fields: Image File",
      });
    }
    const pathfile = `http://localhost:3002/assets/productImages/${req.file.filename}`;
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
        message: "Product created successfully",
      };
    } catch (err) {
      console.log(err);
    }
  });
};

exports.delete = async (id) => {
  try {
    const product = await Product.findOne({ productId: id.trim() });
    if (!product) {
      return { message: "No product found with that ID" };
    }
    await Product.deleteOne({ _id: product._id });
    return { message: "Product deleted successfully" };
  } catch (err) {
    throw err;
  }
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
