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

exports.getByUsername = function(username, callback) {
	sql = "SELECT * FROM Student WHERE username= '" +username+"'";
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};

exports.getPersonalTutor = function(id, callback) {
	sql = "SELECT * FROM AcademicStaff WHERE id= " +id;
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};

exports.getAll = function(callback) {
	con.query("SELECT * FROM Student", function(err, result) {
		if (err) throw err;
		callback(result);
    });
};