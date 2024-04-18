const Product = require("../models/product");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const dotenv = require("dotenv");
dotenv.config();
// Function to search for a product by its ID
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
        Date.now() + '-' + uuidv4() +
        (ext === ".jpeg" || ext === ".jpg" ? ext : ".jpg")
    );
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } }).array("files", 4);
// Function to create a new product
exports.create = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return { status: 404 };
    }
    if (!req.files) {
      return { status: 404 };
    }
    const uploadedFiles = req?.files?.map((file) => {
      return {
        filename: file?.filename,
        path: `${process?.env?.DOMAIN_URL}/assets/productImages/${file?.filename}`
      };
    });
    const { name, description, price, category, stock } = req?.body;
    const pathfile = uploadedFiles?.[0]?.filename ? `${process?.env?.DOMAIN_URL}/assets/productImages/${uploadedFiles?.[0]?.filename}` : "";
    const productId = new mongoose.Types.ObjectId();
    try {
      const value = new Product({
        productName: name,
        description: description,
        price: price,
        category: category,
        productId: productId,
        stock: stock,
        imageURL: pathfile,
        previewImages: uploadedFiles
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
// Function to delete a product by its ID
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
    fs.unlink(imagePath, (err) => {
      if (err) {
        throw err;
      } else {
        return { message: "Product deleted successfully" };
      }
    });
  } catch (err) {
    throw err;
  }
};
// Function to get all products
exports.getAll = async (req, res) => {
  try {
    const result = await Product.find({});
    return result;
  } catch (error) {
    throw error;
  }
};
// Function to edit a product by its ID
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
// Function to search for products by name
exports.searchByName = async (title) => {
  try {
    const regex = new RegExp(".*" + title + ".*", "i");
    const product = await Product.find({ productName: regex });
    return product;
  } catch (err) {
    throw err;
  }
};
// Function to get random laptop products
exports.getRandomLaptopProducts = async () => {
  try {
    const products = await Product.aggregate([{ $sample: { size: 4 } }]);
    return products;
  } catch (err) {
    throw err;
  }
};
// Function to search for products by category
exports.searchByCategory= async (category) => {
  try {
    const product = await Product.find({ category: category  });
    return product;
  } catch (err) {
    throw err;
  }
};
