const mongodb = require("mongodb");
const { getDB } = require("../utils/database");

const ObjectId = mongodb.ObjectId;

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
            .findOne({ _id: new ObjectId(userId) });
    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(
            cp => cp.productId.toString() === product._id.toString()
        );

        let updatedItems = [...this.cart.items];

        if (cartProductIndex >= 0) {
            updatedItems[cartProductIndex].quantity += 1;
        } else {
            updatedItems.push({
                productId: product._id,
                quantity: 1
            });
        }

        const db = getDB();
        return db.collection("users").updateOne(
            { _id: this._id },
            { $set: { cart: { items: updatedItems } } }
        );
    }

    getCart() {
        const db = getDB();

        const productIds = this.cart.items.map(item => item.productId);

        return db.collection("products")
            .find({ _id: { $in: productIds } })
            .toArray()
            .then(products => {
                return products.map(product => {
                    const cartItem = this.cart.items.find(
                        item => item.productId.toString() === product._id.toString()
                    );

                    return {
                        ...product,
                        quantity: cartItem.quantity
                    };
                });
            });
    }

    removeFromCart(productId) {
        const updatedItems = this.cart.items.filter(
            item => item.productId.toString() !== productId.toString()
        );

        const db = getDB();

        return db.collection("users").updateOne(
            { _id: this._id },
            { $set: { cart: { items: updatedItems } } }
        );
    }

}

module.exports = User;