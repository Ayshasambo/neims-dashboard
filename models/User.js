const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email address'
        }
    },
    password:{
        type: String,
        unique: true
    },
    
    role: {
        id:{type: String},
        name:{type: String}
    },
    station:{
        type: String
    }
    // station:{
    //     id:{type:String},
    //     name:{type:String}
    // }
    //station:{
        //type: String
    //}
});

module.exports = mongoose.model("User", userSchema);