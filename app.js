
var mysql = require('mysql');
var bodyParser = require("body-parser");
//var cookieParser = require('cookie-parser');
var session = require('express-session');

var express = require("express");
var app = express();

//Defining the directory where stylesheets and scripts are
app.use(express.static("public"))
//So .ejs extension can be ignored when rendering templates
app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
	secret: "Secret",
	resave: true,
	saveUninitialized: true
}));

app.use(require('./middlewares/auth'));

app.use(require('./controllers'));


app.listen(3000, 'localhost', function() {
    console.log("Server is running...")
});