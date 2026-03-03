const express = require("express");
const router = express.Router();
const shopController=require("../controllers/shopController");

router.get("/products",shopController.getProducts);
router.get("/products/:productId",shopController.getProductById);
router.post("/cart", shopController.addToCart);

module.exports=router;