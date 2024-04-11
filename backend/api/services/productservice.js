const Product = require("../models/product");
const upload = require("../routes/uploadConfig");

exports.search = async (id) => {
  try {
    const product = await Product.findOne({ productId: id.trim() });
    return product;
  } catch (err) {
    throw err;
  }
};

exports.create = async(req, res) => {
  await upload.single("file")(req, res, async (err) => {
    console.log("Above all"+req.file);
    if (!req.file) {
      console.log("print file");
      return res.status(400).json({
        message: "Missing required fields: Image File",
      });
    }
    const pathfile = `http://localhost:3000/user/${req.file.filename}`
    try {
      const value = new Product({
        productName: req.body.name,
        description: req.body.description,
        price: req.body.price,
        rating: req.body.rating,
        productId: req.body.productId,
        imageURL: pathfile,
      });
      console.log("Above the save function");
      await value.save();
      return{
        message: "Namma Jaichitom Maara",
      };
    } catch (err) {
      console.log(err);
    }
  })
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