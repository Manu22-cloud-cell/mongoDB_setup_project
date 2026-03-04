const Product=require("../models/product");
const Order = require("../models/order");

exports.getProducts = (req, res) => {
    Product.fetchAll()
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => {
            res.status(500).json({ error: "Failed to fetch products" });
        });
};

exports.getProductById=(req,res)=>{

    const prodId=req.params.productId;

    Product.findById(prodId)
    .then(product=>{
        res.status(200).json(product);
    })
    .catch(err=>{
        res.status(500).json({error:"Failed to fetch the product"});
    })
}

exports.addToCart = (req, res) => {
    const prodId = req.body.productId;

    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(() => {
            res.status(200).json({ message: "Added to cart" });
        })
        .catch(err => console.log(err));
};

exports.getCart = (req, res) => {
    req.user.getCart()
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => console.log(err));
};

exports.removeFromCart = (req, res) => {
    const prodId = req.body.productId;

    req.user.removeFromCart(prodId)
        .then(() => {
            res.status(200).json({ message: "Removed from cart" });
        })
        .catch(err => console.log(err));
};

exports.placeOrder = (req, res) => {
    req.user.placeOrder()
        .then(() => {
            res.status(200).json({ message: "Order placed successfully" });
        })
        .catch(err => console.log(err));
};

exports.getOrders = (req, res) => {
    Order.findByUserId(req.user._id)
        .then(orders => {
            res.status(200).json(orders);
        })
        .catch(err => console.log(err));
};