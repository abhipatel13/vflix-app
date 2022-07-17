const jsonwt = require("jsonwebtoken");
const mongoose  = require("mongoose");
// require("../model/registerSchema");
const Register = require("../model/registerSchema");

const auth = async(req,res,next) =>{
    try{
  const token = req.cookies.jwt;
  // console.log(req.cookies.jwt);
  const verifyUser = await jsonwt.verify(token,process.env.SECRET);
  const user = await Register.findOne({_id:verifyUser._id});
//   console.log(user.name);
  next();
    }
    catch(err){
        console.log(err);
        res.status(403).send({err:"Please Login First"});
    }
}

module.exports = auth;