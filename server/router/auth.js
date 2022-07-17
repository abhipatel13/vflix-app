const express = require("express");
const Movie = require("../model/movieSchema");
const router = express.Router();
require("../db/conn");
const auth = require("../Middleware/auth");
// const User = require("../model/movieSchema");
const cookieParser = require("cookie-parser");
require("../model/registerSchema");
const Register = require("../model/registerSchema");
// For parsing application/json
router.use(express.json());
router.use(cookieParser());
router.use(express.urlencoded({extended:false}));
// For parsing application/x-www-form-urlencoded
router.use(express.urlencoded({ extended: true }));

router.get("/",(req,res)=>{
    res.send("Hello World from Router");
});


router.get("/api/getdata",auth,(req,res)=>{
   
   Movie.find()  
   .then((documents)=>{  
   //   console.log(documents);  
     res.send(documents);  
   });  
})

router.get("/api/getdata/:id",(req,res)=>{
   Movie.findById(req.params.id)  
   .then((documents)=>{  
   //   console.log(documents);  
     res.send(documents);  
   }).catch((err)=>
      {console.log(err)}
   )
})

router.delete("/entermovie/:id",auth,async(req,res)=>{
   try{
      const id = req.params.id;
      console.log(id);
      // Movie.findOne({id}).then(
      //    (document)=>
      //    {
      //       console.log(document);
      //    }
      // )
      Movie.deleteOne({ _id: id }, function(err) {
         if (!err) {
               console.log(err);
         }
         else {
                 console.log("Deleted Successfully");
         }
     });
     res.json({message:"Delete Request"});
   }
   catch(err){
      console.log(err);
   }

   
})


router.put("/entermovie/:id",auth,async(req,res)=>{
  
   const { name , releasedate ,tagline , rating , image , video , runtime } = req.body
      // const id =req.params.id;
      console.log(req.params.id);
    
      // res.json({message:"Put Request Successfully"});
      // const { id ,name , releasedate ,tagline , rating , image , video , runtime } = req.body;
      // console.log(req.body.name);
      Movie.findOne({_id : req.params.id}).then(async(userExist)=>{
     
         if(userExist){
          const updatedData = await Movie.findByIdAndUpdate(userExist._id,{
            name , releasedate ,tagline , rating , image , video , runtime 
          },{new:true});
          res.send(updatedData);
         }
         else {
            console.log("user not exist");

         }
      })
      
      
      
   
})


router.post("/entermovie",auth,(req,res)=>{
   const { id , name , releasedate ,tagline , rating , image , video , runtime } = req.body;
//  const {name , email } = req.body;
   if(!id , !name || !releasedate)
   {
    return res.status(422).json({error : "Please Fill Name and ReleseDate"});
   }
// return res.status(500).json({message : "Successfully Created"});
   Movie.findOne({id : id}).then((userExist)=>{
    if(userExist){
        return res.status(422).json({error:"ID Already Exist"});
    }
   
     const movie = new Movie({
        name , releasedate , tagline , rating , image , video , runtime
     });

     movie.save().then(()=>{
        res.status(201).json({message :"Movie Created Successfully"})
     }).catch((err)=> res.status(500).json({error : "Failed to Register"}))

   }).catch(err => {console.log(err)});
 });
 

 
router.post("/register",(req,res)=>{
   const { name , email ,password} = req.body;
   // console.log(email);
//  const {name , email } = req.body;
   if(!email || !password)
   {
    return res.status(422).json({error : "Please Fill Name and ReleseDate"});
   }
// return res.status(500).json({message : "Successfully Created"});
Register.findOne({email:email}).then(async(userExist)=>{
    if(userExist){
      
        return res.status(422).json({error:"ID Already Exist"});
    }
   
     const register = new Register({
      name , email , password
     });

   //   const token = await register.generateAuthToken();

      //  res.cookie("jwt",token,{
      //    expires:new Date(Date.now()+300000),
      //    httpOnly:true
      //  })

     register.save().then(()=>{
        res.status(201).json({message :"User Registed Successfully"})
     }).catch((err)=> res.status(500).json({error : "Failed to Register"}))

   }).catch(err => {console.log(err)});
 });
 

 router.post("/login",async(req,res)=>{
   try{
       const email = req.body.email;
       const password = req.body.password;
       const useremail = await Register.findOne({email : email});
       const token = await useremail.generateAuthToken();

       res.cookie("jwt",token,{
         expires:new Date(Date.now()+300000),
         httpOnly:true
       })
      //  console.log(token);
       if(password===useremail.password)
       {
         res.json({message:"Login Successfully"});
       }
       else {
         console.log("Error in login");
       }
   }
   catch(err){
      console.log("Catch Error");
   }
 })

module.exports = router;