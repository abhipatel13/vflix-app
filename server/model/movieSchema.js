const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
   
    // id :{
    //     type:Number,
    
    // },
    name :{
        type:String,
        require : true
    },
  
    releasedate : {
        type : String,
        require : true
    },
    tagline : {
        type : String
    },
    rating : {
        type : Number
    },
    image : {
        type : String
    },
    video : {
      type : String  
    },
    runtime : {
        type : String
    }


})

const Movie = mongoose.model('MOVIE',movieSchema);

module.exports = Movie;