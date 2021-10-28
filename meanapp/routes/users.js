//import modules
const passport = require("passport");
const jwt = require("jsonwebtoken");
const express = require("express");
//initialize the router
const router = express.Router();
//get user module
const User = require("../models/user");
const Post = require("../models/Post");
const Images = require("../models/Images");
const config = require("../config/database");

//get own posts
router.get("/dashboard", (req, res, next) => {
    console.log("getting current users posts");
    res.json("sdfokj");
});



//show all of the posts on the home page
router.get("/posts", (req, res, next) => {

    console.log("getting all of the posts");
    Post.find({ private: false }, (err, posts) => {
        if (err) return next(err);

        if (posts) {
            return res.send(posts);
        } else {
            return res.status(404).send("No public posts found!");
        }
    });

});

//add to images
router.post('/images', (req, res, next) => {

    /* upload(req, res, (err) => {
         if (err) {
             console.log("upload error");
         }*/

    console.log(req.files);

    const imageCount = req.files.length;
    for (var x = 0; x < imageCount; x++) {
        let originalName = req.files[x].originalname;
        console.log("server: " + req.files[x].originalname);
        imageNames.push(req.files[x].originalname);
        new Images({
            buffer: req.files[x].buffer,
            name: req.files[x].originalname,
            mimetype: req.files[x].mimetype,
            encoding: req.files[x].encoding
        }).save((err) => {
            if (err) return next(err);
            console.log("saved image: " + originalName);
            //return res.send(req.files);
        });


        //});
    }

    res.end();
});

//add new post
router.post("/posts", (req, res, next) => {


    let imgIDs = [];
    for (var i = 0; i <= req.body.images.length; i++) {
        Images.find({ name: req.body.images[i] })
            .then(image => {

                imgIDs.push(image[0]._id);
                // console.log("id is: " + imageIds);
                //imageIds.push(image[0]._id);
            }).catch(err => console.log(err))
            .then(() => {
                if (imgIDs.length == req.body.images.length) {
                    let newPost = new Post({
                        userID: req.body.userID,
                        title: req.body.title,
                        text: req.body.text,
                        images: imgIDs,
                        private: req.body.private
                    }).save((err) => {
                        if (err) return next(err);
                        console.log("saved new recipe");
                    });
                }
            }).catch(err => console.log(err));

    }
    res.send(req.body);


});


//register route
router.post("/register", (req, res, next) => {

    console.log("kjhgfs");
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
    console.log("serching for the user");
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
                console.log(user);
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
                console.log(token);
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