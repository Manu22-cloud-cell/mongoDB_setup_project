const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: String,
        email: String
    },
    products: [
        {
            product: {
                _id: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                title: String,
                price: Number,
                description: String,
                imageUrl: String
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);