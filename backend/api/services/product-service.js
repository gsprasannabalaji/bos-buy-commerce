const Product = require("../models/product");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

exports.search = async (id) => {
  try {
    const product = await Product.findOne({ productId: id.trim() });
    return product;
  } catch (err) {
    throw err;
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/productImages");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        (ext === ".jpeg" || ext === ".jpg" ? ext : ".jpg")
    );
  },
});

const upload = multer({ storage: storage }).single("file");

exports.create = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return { status: 404 };
    }
    if (!req.file) {
      return { status: 404 };
    }
    const { name, description, price, category } = req.body;
    const pathfile = `http://localhost:3002/assets/productImages/${req.file.filename}`;
    const productId = new mongoose.Types.ObjectId();
    try {
      const value = new Product({
        productName: name,
        description: description,
        price: price,
        category: category,
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
      return { status: 404, message: "No product found with that ID" };
    }
    const imagePath = path.join(
      __dirname,
      "..",
      "..",
      "assets",
      "productImages",
      path.basename(product.imageURL)
    );
    await Product.deleteOne({ _id: product._id });
    fs.unlink(imagePath);
    return { message: "Product deleted successfully" };
  } catch (err) {
    throw err;
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await Product.find({});
    return result;
  } catch (error) {
    throw error;
  }
};

exports.edit = async (id, data) => {
  try {
    const product = await Product.findOneAndUpdate({ productId: id.trim() }, data, { new: true });
    if (!product) {
      return { status: 404, message: "No product found with that ID" };
    }else{
      return product;
    }
  } catch (error) {
    throw error;
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

exports.searchByCategory= async (category) => {
  try {
    const product = await Product.find({ category: category  });
    return product;
  } catch (err) {
    throw err;
  }
};
