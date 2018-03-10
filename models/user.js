/*
MODEL FOR USER ATHENTICATION
*/

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "SISdb"
});

exports.get = function(username, callback){
	sql = "SELECT * FROM User where username= '"+username+"'";
	con.query(sql, function(err, result) {
    if (err) throw err;
    callback(result);
    });
};