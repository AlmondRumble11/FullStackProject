//import modules
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const path = require("path");
const config = require("./config/database");

//connec to db
mongoose.connect(config.database);

//on coonncetion 
mongoose.connection.on('connected', () => {

    console.log("connect to database: " + config.database);
});

//on error 
mongoose.connection.on('error', (err) => {

    console.log("err: " + err);
});
//initialize the app
const app = express();

//add port 
const port = process.env.PORT || 5000;



//add cors middleware
app.use(cors());

//setting a static public folder for the client
app.use(express.static(path.join(__dirname, "public")));

//add body parser middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyparser.json()); //depricated
//https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
//express v4.16.0 and higher
app.use(express.json());



//passport middleware
//
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(cookieParser());
app.use(session({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);





//get users route
const usersRoute = require("./routes/users");
app.use("/users", usersRoute);


//route to homepage
app.get('/', (req, res, next) => {

    res.send("PLACE HOLDER HOMEPAGE");
});

//listen to port and start the server
app.listen(port, () => {
    console.log("server is running on the port: " + port);
});