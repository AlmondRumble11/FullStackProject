const mongoose = require("mongoose");
const config = require("../config/database");

//user schema
const postShema = mongoose.Schema({
    userID: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    images: {
        type: Array
    },

    private: {
        type: Boolean
    }
});

//export
const Post = module.exports = mongoose.model('Post', postShema);