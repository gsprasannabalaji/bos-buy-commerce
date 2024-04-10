const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/:id", productController.search);
router.post("/create", productController.create);

module.exports = router;
