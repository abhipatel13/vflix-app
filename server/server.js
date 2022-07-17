const express = require("express");
const app = express();
const dotenv = require('dotenv');
const mongoose = require("mongoose");
require('./db/conn');
const Movie = require("./model/movieSchema");
const PORT = process.env.PORT;

// console.log(process.env.DATABASE);

app.use(express.Router());
app.use(require('./router/auth'));


  


app.listen(PORT,()=>{
    console.log("Server Running at 5000");
})