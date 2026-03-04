const express = require("express");
const router = express.Router();
const shopController=require("../controllers/shopController");

router.get("/products",shopController.getProducts);
router.get("/products/:productId",shopController.getProductById);
router.post("/cart", shopController.addToCart);
router.get("/cart", shopController.getCart);
router.post("/cart-delete-item", shopController.removeFromCart);
router.post("/create-order", shopController.placeOrder);
router.get("/orders", shopController.getOrders);

module.exports=router;