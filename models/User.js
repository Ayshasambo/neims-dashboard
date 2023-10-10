const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type: String
    },
    surname:{
        type: String
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String
    },
    
    role: {
        id:{type: String},
        name:{type: String}
    },
    station:{
        id:{type:String},
        name:{type:String}
    }
    //station:{
        //type: String
    //}
});

module.exports = mongoose.model("User", userSchema);