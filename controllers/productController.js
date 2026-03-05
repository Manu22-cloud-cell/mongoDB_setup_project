const Product = require("../models/product");

exports.addProduct = async (req, res) => {
    try {
        const { title, price, description, imageUrl } = req.body;

        const product = await Product.create({
            title,
            price,
            description,
            imageUrl
        });

        res.status(201).json({
            message: "Product added successfully",
            productId: product._id
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add product" });
    }
};


exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const prodId = req.params.productId;

        await Product.findByIdAndDelete(prodId);

        res.status(200).json({ message: "Product deleted" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Delete failed" });
    }
};


exports.editProduct = async (req, res) => {
    try {
        const prodId = req.params.productId;
        const { title, price, description, imageUrl } = req.body;

        await Product.findByIdAndUpdate(
            prodId,
            { title, price, description, imageUrl },
            { new: true }
        );

        res.status(200).json({ message: "Product updated" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Update failed" });
    }
};