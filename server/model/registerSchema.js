const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
require('dotenv').config;
require("../db/conn");
const registerSchema = new mongoose.Schema({
   
    // id :{
    //     type:Number,
    
    // },
    name :{
        type:String,
   
    },
  
   email : {
    type : String,
    require : true
   },

   password :{
    type:String,
    require : true
   },

   tokens:[
    {
        token :{
            type:String,
            require:true
        }
    }
   ]


})
registerSchema.methods.generateAuthToken = async function(){
    try{
        const token = await jwt.sign({_id:this._id.toString()},process.env.SECRET);
        this.tokens = this.tokens.concat({token});
        await this.save();
        return token;
    }
    catch(err)
    {
        console.log(err);
    }
}
const Register = mongoose.model('REGISTER',registerSchema);

module.exports = Register;