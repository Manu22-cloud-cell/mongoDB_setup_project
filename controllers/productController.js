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

exports.deleteProduct = (req, res) => {
    const prodId = req.params.productId;

    Product.deleteById(prodId)
        .then(result => {
            res.status(200).json({ message: "Product deleted" });
        })
        .catch(err => {
            res.status(500).json({ error: "Delete failed" });
        });
};

exports.editProduct = (req, res) => {
    const prodId = req.params.productId;
    const { title, price, description, imageUrl } = req.body;

    Product.updateById(prodId, { title, price, description, imageUrl })
        .then(result => {
            res.status(200).json({ message: "Product updated" });
        })
        .catch(err => {
            res.status(500).json({ error: "Update failed" });
        });
};

