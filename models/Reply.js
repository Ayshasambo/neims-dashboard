const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    repliedTo: {
        id:{type:String},
        firstname:{type:String},
        surname:{type:String}
    },
    body: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Reply', replySchema);