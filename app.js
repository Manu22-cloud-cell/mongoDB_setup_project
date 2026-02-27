require("dotenv").config();

const express=require("express");
const mongoConnect=require("./utils/database");

const app=express();

mongoConnect(()=>{
    app.listen(3000);
});


