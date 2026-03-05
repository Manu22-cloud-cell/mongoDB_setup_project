require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose")
const productRoutes = require("./routes/product");
const shopRoutes = require("./routes/shop");

const User = require("./models/user");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "views")));

app.use(async (req, res, next) => {
    try {
        const user = await User.findById(req.app.locals.userId);

        if (!user) {
            return next();
        }

        req.user = user;
        next();

    } catch (err) {
        console.log(err);
    }
});

app.use("/admin", productRoutes);
app.use("/shop", shopRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("Connected via Mongoose");

        // Check if user exists
        const existingUser = await User.findOne();

        if (!existingUser) {
            const newUser = await User.create({
                name: "Manoj",
                email: "manoj@email.com",
                password: "123456",
                cart: { items: [] }
            });

            app.locals.userId = newUser._id.toString();
        } else {
            app.locals.userId = existingUser._id.toString();
        }

        app.listen(3000);
    })
    .catch(err => console.log(err));


