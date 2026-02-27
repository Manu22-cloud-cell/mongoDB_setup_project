const express = require("express");
const router = express.Router();
const shopController=require("../controllers/shopController");

router.get("/products",shopController.getProducts);

module.exports=router;