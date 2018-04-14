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

exports.getCourseworkOf = function(module,callback) {
	sql = "SELECT id, CourseworkNumber, FileName, IsApproved FROM Coursework "+
		"WHERE ModuleCode= '"+module+"'";
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
};

exports.approveCourseworkById = function(id,callback) {
	sql = "UPDATE Coursework "+
		"SET IsApproved = 1 "+
		"WHERE id ="+id;
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback();
    });
};

exports.disapproveCourseworkById = function(id,callback) {
	sql = "UPDATE Coursework "+
		"SET IsApproved = 0 "+
		"WHERE id ="+id;
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback();
    });
};