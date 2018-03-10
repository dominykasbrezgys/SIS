/*
Academic Staff MODEL
*/
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "SISdb"
});

exports.get = function(username, callback) {
	sql = "SELECT * FROM AcademicStaff WHERE username= '" +username+"'";
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};
