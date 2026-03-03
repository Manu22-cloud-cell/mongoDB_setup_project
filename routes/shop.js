const express = require("express");
const router = express.Router();
const shopController=require("../controllers/shopController");

router.get("/products",shopController.getProducts);
router.get("/products/:productId",shopController.getProductById);
router.post("/cart", shopController.addToCart);
router.get("/cart", shopController.getCart);
router.post("/cart-delete-item", shopController.removeFromCart);

module.exports=router;