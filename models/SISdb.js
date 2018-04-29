/*
This is a reusable wrapper of the connection with the MySQL server,
which is shared within the Model layer of this application.
*/

var mysql = require('mysql');

/**
Connects to MySQL server
NOTE: credentials need to be obtained from 
the final report of this project (section 5.2.4) due to security reasons.
*/
var con = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: ""
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the database...");
});

module.exports = con;