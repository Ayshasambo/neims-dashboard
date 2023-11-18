const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({

    firstname:{
        type: String,
    },
    surname:{
        type: String,
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
        id:{type:String},
        name:{type:String}    
    },
    status:{
        type:String,
        default:'active'
    }
});

module.exports = mongoose.model("User", userSchema);