const Product = require("../models/product");

exports.addProduct = (req, res) => {

    const { title, price, description, imageUrl } = req.body;

    const product = new Product(title, price, description, imageUrl);

    product.save()
        .then(result => {
            res.status(201).json({
                message: "Product added successfully",
                productId: result.insertedId
            });
        })
        .catch(err => {
            res.status(500).json({ error: "Failed to add product" });
        });
};

exports.getProducts = (req, res) => {
    Product.fetchAll()
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => {
            res.status(500).json({ error: "Failed to fetch products" });
        });
};

