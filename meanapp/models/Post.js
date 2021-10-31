const mongoose = require("mongoose");
const config = require("../config/database");

//user schema
const postShema = mongoose.Schema({
    userID: {
        type: String
    },
    username:{
        type:String
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    private: {
        type: Boolean
    }
});

//export
const Post = module.exports = mongoose.model('Post', postShema);