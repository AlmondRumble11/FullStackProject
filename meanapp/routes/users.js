//import modules
const passport = require("passport");
const jwt = require("jsonwebtoken");
const express = require("express");
//initialize the router
const router = express.Router();
//get user module
const User = require("../models/user");
const config = require("../config/database");



//register route
router.post("/register", (req, res, next) => {
    //create a new user object
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    //add the user
    console.log("adding new user");
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: "failed to register user" });
        } else {
            res.json({ success: true, msg: "Registered the user" });
        }
    });
    //res.send("THIS IS THE REGISTER PAGE");
});


//authenticate route
router.post("/authenticate", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    //getting user using user name from the db
    //console.log("serching for the user");
    User.getUserByUsername(username, (err, user) => {
        if (err) throw console.log("error: " + err);
        //if no user
        if (!user) {
            return res.json({ success: false, msg: "User not found" });
        }
        //comapres the users hash password to given password
        //console.log("comparing the pw");
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            //if the passwords match--> create a token that expires in time
            //  console.log("checking if passwords are the same");
            if (isMatch) {
                //    console.log("creating a token");
                //https://stackoverflow.com/questions/52781477/expected-payload-to-be-a-plain-object-mean
                const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: 604800 // 1 weeks time
                });
                console.log(config.secret);
                console.log("sending info");
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email

                    }
                });
                //no mathc
            } else {
                return res.json({ success: false, msg: "Wrong password" });
            }
        });
    });
    //res.send("THIS IS THE AUTHENTICATE PAGE");
});

//profile route
//authenticate is for the protection
router.get("/profile", passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});

//validate route
/*router.get("/validate", (req, res, next) => {
    res.send("THIS IS THE VALIDATE PAGE");
});*/

//export
module.exports = router;