//import modules
const passport = require("passport");
const jwt = require("jsonwebtoken");
const express = require("express");
//initialize the router
const router = express.Router();
//get user module
const User = require("../models/user");
const Post = require("../models/Post");

const config = require("../config/database");

//get all posts
router.get("/dashboard", (req, res, next) => {
    console.log("getting current users posts");
    res.json("sdfokj");
});

router.get("/posts/:id", (req, res, next) => {
    let allPosts = [];
    const id = req.params.id;
    //find the user
    User.findById({ _id: id }).then((user) => {

        Post.find({ userID: user._id }).then((posts) => {

            //console.log("sfdsdf" + posts);
            if (posts) {
                allPosts.push(posts);
                console.log(allPosts);
                res.send(allPosts);
            }

        }).catch((err) => console.log(err));



    }).catch(err => console.log(err));
});

router.get("/posts/all/:title", (req, res, next) => {

    console.log("############################################");
    //https://stackoverflow.com/questions/10610131/checking-if-a-field-contains-a-string
    Post.find({ title: { $regex: req.params.title } }, (err, data) => {
        if (err) console.log(err);
        console.log(data);
        res.send(data);

    })
})

//show all of the posts 
router.get("/posts", (req, res, next) => {
    let publicPosts = [];
    console.log("getting all of the posts");
    Post.find({}, (err, posts) => {
        if (err) return next(err);

        if (posts) {
            //console.log(posts);
            for (let i = 0; i < posts.length; i++) {
                if (posts[i].private != true) {
                    publicPosts.push(posts[i]);
                }
            }
            //console.log(publicPosts);
            return res.send(publicPosts);
        } else {
            return res.status(404).send("No public posts found!");
        }
    });

});



//add new post
router.post("/addpost", (req, res, next) => {


    let imgIDs = [];
    /*for (var i = 0; i <= req.body.images.length; i++) {
        Images.find({ name: req.body.images[i] })
            .then(image => {

                imgIDs.push(image[0]._id);
                // console.log("id is: " + imageIds);
                //imageIds.push(image[0]._id);
            }).catch(err => console.log(err))
            .then(() => {
                if (imgIDs.length == req.body.images.length) {*/
    console.log(req.body);
    let newPost = new Post({
        userID: req.body.userID,
        username: req.body.username,
        title: req.body.title,
        content: req.body.content,
        //images: imgIDs,
        private: req.body.private
    }).save((err) => {
        if (err) {
            res.json({ success: false, msg: "failed to register user" });
            throw next(err);
            return
        };
        console.log("saved new post");
    });
    //}
    //}).catch(err => console.log(err));

    //}
    res.json({ success: true, msg: "Registered the user" });


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

//update user object to add posts to it
router.post("/update/user", (req, res, next) => {
    //get values from the req object
    const userID = req.body.userID;
    const postTitle = req.body.postTitle;


    //get post id for the post ot be added to user's posts
    Post.findOne({ userID: userID, title: postTitle }, (err, post) => {
        if (err) throw err;


        //if post was found(should find it always)
        if (post) {
            var postID = post._id;
            //add post to users posts
            console.log("Found the post");
            console.log(post);

            //update the user post array. Add id of the post to it
            User.findOneAndUpdate({ _id: userID }, { $push: { posts: postID } }, (err, success) => {
                if (err) throw err;

                if (!success) {
                    res.json({ success: false, msg: "failed to add post" });
                } else {
                    res.json({ success: true, msg: "Post was added for the correct user" });
                }
            });

        } else {
            console.log("No post found. Something went wrong...");
        }

    })



    console.log(req.body);

});

//update a post
router.post("/update/post", (req, res, next) => {
    //  console.log(req.body);



    Post.findByIdAndUpdate({ _id: req.body._id }, { $set: { content: req.body.content } }, { $set: { private: req.body.private } }, (err, success) => {
        if (err) throw err;

        if (!success) {
            res.json({ success: false, msg: "failed to modify post" });
        } else {
            res.json({ success: true, msg: "Post was modified" });
        }
    });

});


//remove a post
router.post("/remove/post", (req, res, next) => {
    console.log(req.body);
    let updatedUserPosts = [];
    Post.findByIdAndRemove({ _id: req.body._id }, (err, success) => {
        //discard error
        if (err) throw err;


        //was removed from posts 
        if (success) {

            //first get all user posts
            User.findById({ _id: req.body.userID }, (err, user) => {
                if (err) throw err;

                //found the user
                if (user) {
                    for (let i = 0; i < user.posts.length; i++) {
                        //if post not the removed one
                        if (user.posts[i] != req.body._id) {
                            updatedUserPosts.push(user.posts[i]);
                        }
                    }

                    //remove post from the user also
                    User.findByIdAndUpdate({ _id: req.body.userID }, { $set: { posts: updatedUserPosts } }, (err, success) => {
                        if (err) throw err;

                        if (success) {
                            res.json({ success: true, msg: "removed post from the user" });

                        } else {
                            res.json({ success: false, msg: "failed to remove post" });
                        }
                    });

                } else {
                    res.json({ success: false, msg: "failed to remove post" });
                }
            });
        } else {
            res.json({ success: false, msg: "failed to remove post" });
        }

    });
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
    console.log("getting current user");
    console.log("current user:" + req.user);
    res.json({ user: req.user });
});

router.get("/post/:id", (req, res, next) => {
    console.log("jksdnfjkdsfnjksd");

    console.log(req.params.id);
    Post.findById({ _id: req.params.id }, (err, post) => {
        console.log(post);
        if (err) return next(err);

        if (post) {

            return res.json(post);
        } else {
            return res.status(404).send("No post found!");
        }
    });

});



//export
module.exports = router;