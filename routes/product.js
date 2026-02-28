const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/add-product", productController.addProduct);
router.get("/products", productController.getProducts);
router.delete("/delete-product/:productId",productController.deleteProduct);
router.put("/edit-product/:productId",productController.editProduct);

module.exports = router;