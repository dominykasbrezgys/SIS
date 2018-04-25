/*
This is a reusable wrapper of the connection with the MySQL server,
which is shared within the Model layer of this application.
*/

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "SISdb"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the database...");
});

module.exports = con;