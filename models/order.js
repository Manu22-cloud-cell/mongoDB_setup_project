const { getDB } = require("../utils/database");
const mongodb = require("mongodb");

class Order {
    constructor(user, products) {
        this.user = user;
        this.products = products;
        this.createdAt = new Date();
    }

    save() {
        const db = getDB();
        return db.collection("orders").insertOne(this);
    }

    static findByUserId(userId) {
        const db = getDB();
        return db.collection("orders")
            .find({ "user.userId": new mongodb.ObjectId(userId) })
            .toArray();
    }
}

module.exports = Order;