/*
MODEL
*/
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "SISdb"
});

exports.getById = function(id, callback) {
	sql = "SELECT * FROM Course WHERE id= '" +id+"'";
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};
