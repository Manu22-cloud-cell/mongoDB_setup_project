const mongoose = require("mongoose");
const Order=require("./order");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
}, { timestamps: true });

/* =============================
   Instance Methods
============================= */

userSchema.methods.addToCart = async function (product) {

    const cartProductIndex = this.cart.items.findIndex(
        cp => cp.productId.toString() === product._id.toString()
    );

    if (cartProductIndex >= 0) {
        this.cart.items[cartProductIndex].quantity += 1;
    } else {
        this.cart.items.push({
            productId: product._id,
            quantity: 1
        });
    }

    return this.save();
};


userSchema.methods.getCart = async function () {

    await this.populate("cart.items.productId");

    return this.cart.items.map(item => {
        return {
            ...item.productId._doc,
            quantity: item.quantity
        };
    });
};

userSchema.methods.placeOrder = async function () {

    await this.populate("cart.items.productId");

    const products = this.cart.items.map(item => {
        return {
            product: {
                _id: item.productId._id,
                title: item.productId.title,
                price: item.productId.price,
                description: item.productId.description,
                imageUrl: item.productId.imageUrl
            },
            quantity: item.quantity
        };
    });

    const order = new Order({
        user: {
            userId: this._id,
            name: this.name,
            email: this.email
        },
        products: products
    });

    await order.save();

    this.cart = { items: [] };

    return this.save();
};

userSchema.methods.removeFromCart = async function (productId) {

    this.cart.items = this.cart.items.filter(
        item => item.productId.toString() !== productId.toString()
    );

    return this.save();
};


userSchema.methods.clearCart = function () {
    this.cart = { items: [] };
    return this.save();
};


module.exports = mongoose.model("User", userSchema);