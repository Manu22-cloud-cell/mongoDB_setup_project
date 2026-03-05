const Product = require("../models/product");
const Order = require("../models/order");

exports.getProducts = async (req, res) => {
    try {

        const products = await Product.find();

        res.status(200).json(products);

    } catch (err) {

        res.status(500).json({ error: "Failed to fetch products" });

    }
};


exports.getProductById = async (req, res) => {

    try {

        const product = await Product.findById(req.params.productId);

        res.status(200).json(product);

    } catch (err) {

        res.status(500).json({ error: "Failed to fetch product" });

    }

};


exports.addToCart = async (req, res) => {

    try {

        const product = await Product.findById(req.body.productId);

        await req.user.addToCart(product);

        res.status(200).json({ message: "Added to cart" });

    } catch (err) {

        console.log(err);

    }

};


exports.getCart = async (req, res) => {

    try {

        const products = await req.user.getCart();

        res.status(200).json(products);

    } catch (err) {

        console.log(err);

    }

};


exports.removeFromCart = async (req, res) => {

    try {

        await req.user.removeFromCart(req.body.productId);

        res.status(200).json({ message: "Removed from cart" });

    } catch (err) {

        console.log(err);

    }

};


exports.placeOrder = async (req, res) => {

    try {

        await req.user.placeOrder();

        res.status(200).json({ message: "Order placed successfully" });

    } catch (err) {

        console.log(err);

    }

};


exports.getOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            "user.userId": req.user._id
        });

        res.status(200).json(orders);

    } catch (err) {

        console.log(err);

    }

};