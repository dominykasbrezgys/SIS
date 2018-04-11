/*
MODEL FOR ENROLMENT TABLE
*/
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "SISdb"
});

exports.getByStudentID = function(studentID, callback) {
	sql = "SELECT * FROM Enrolment WHERE StudentID= '" +studentID+"'";
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
};
