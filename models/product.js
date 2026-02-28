const mongodb = require("mongodb");
const { getDB } = require("../utils/database");

class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {
        const db = getDB();
        return db.collection('products').insertOne(this)
    }

    static fetchAll() {
        const db = getDB();
        return db.collection("products").find().toArray();
    }

    static findById(prodId) {
        const db = getDB();
        return db.collection("products")
            .findOne({ _id: new mongodb.ObjectId(prodId) });
    }
}

module.exports = Product;