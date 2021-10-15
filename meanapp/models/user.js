const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");

//user schema
const userShema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//export
const User = module.exports = mongoose.model('User', userShema);
module.exports.getUserById = function(id, callback) {
    //console.log("getting user id");
    User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback) {
    //console.log("getting username");
    const query = { username: username };
    //console.log("username is: " +username);
    User.findOne(query, callback);
};

//adding user
module.exports.addUser = function(newUser, callback) {
        console.log(newUser);
        //console.log("adding user");
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save(callback);
            });
        });
    }
    //comapres the hash and user given password
module.exports.comparePassword = function(candidatePassword, hash, callback) {
    // console.log("comparing password");
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {

        if (err) throw err;
        callback(null, isMatch);
    });
}