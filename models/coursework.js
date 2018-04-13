/*
MODEL FOR Coursework managing
*/
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "SISdb"
});

exports.addCoursework = function(coursework,callback) {
	sql = "INSERT INTO Coursework "+
	"(ModuleCode, CourseworkNumber, SetDate, DueDate, ReturnDate, Weighting, MaxMark, Notes, FileName) "+
	"VALUES ?";
	con.query(sql,[coursework], function(err, result) {
		if (err) throw err;
		callback();
    });
};