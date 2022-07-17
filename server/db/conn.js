const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const DB = process.env.DATABASE;

mongoose.connect(DB,{
    useNewUrlParser : true,

    useUnifiedTopology : true
 
}).then(()=>{
    console.log("Connection Successful");
}).catch((err)=> console.log(err))