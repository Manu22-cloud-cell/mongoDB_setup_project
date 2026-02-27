require("dotenv").config();

const express=require("express");
const path=require("path");
const cors=require("cors");
const {mongoConnect}=require("./utils/database");
const productRoutes=require("./routes/product");

const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"views")));

app.use("/",productRoutes);

mongoConnect(()=>{
    app.listen(3000,()=>{
        console.log("Server is running on port 3000");
    });
});


