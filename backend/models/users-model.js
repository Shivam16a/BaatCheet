const mongoose = require('mongoose');

const usershema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    gendet:{
        type:String,
        required:true,
        enum:["male","female"],
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    prifipic:{
        type:String,
        required:true,
        default:"",
    },
});

const User = new mongoose.model("User",usershema);
module.exports = User;