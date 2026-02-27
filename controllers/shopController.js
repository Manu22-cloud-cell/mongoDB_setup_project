const Product=require("../models/product");

exports.getProducts = (req, res) => {
    Product.fetchAll()
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => {
            res.status(500).json({ error: "Failed to fetch products" });
        });
};