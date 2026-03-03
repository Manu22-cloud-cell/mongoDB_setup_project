require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const { mongoConnect, getDB } = require("./utils/database");
const productRoutes = require("./routes/product");
const shopRoutes = require("./routes/shop");

const User = require("./models/user");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "views")));

app.use((req, res, next) => {
    User.findUserById(req.app.locals.userId)
        .then(user => {
            if (!user) {
                return next();
            }

            req.user = new User(
                user.name,
                user.email,
                user.password,
                user.cart,
                user._id
            );

            next();
        })
        .catch(err => console.log(err));
});

app.use("/admin", productRoutes);
app.use("/shop", shopRoutes);

mongoConnect(() => {
    const db = getDB();

    db.collection("users").findOne()
        .then(user => {
            if (!user) {
                const newUser = new User(
                    "Manoj",
                    "manoj@email.com",
                    "123456"
                );
                return newUser.save();
            }
            return user;
        })
        .then(result => {
            const userId = result.insertedId ? result.insertedId : result._id;
            app.locals.userId = userId.toString();
            app.listen(3000);
        })
        .catch(err => console.log(err));
});


