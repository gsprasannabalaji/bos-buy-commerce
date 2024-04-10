const Product = require('../models/product');

exports.search = async (id) => {
    try {
        const product = await Product.findOne({ productId: id.trim() });;
        return product; 
    } catch (err) {
        throw err; 
    }
};
