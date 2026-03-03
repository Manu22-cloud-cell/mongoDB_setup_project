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