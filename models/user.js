const mongodb = require("mongodb");
const { getDB } = require("../utils/database");

class User {
    constructor(name, email, password, cart, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.cart = cart || { items: [] };
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    // Insert user into MongoDB
    save() {
        const db = getDB();
        return db.collection("users").insertOne(this);
    }

    // Find user by ID
    static findUserById(userId) {
        const db = getDB();
        return db.collection("users")
            .findOne({ _id: new mongodb.ObjectId(userId) });
    }
}

module.exports = User;