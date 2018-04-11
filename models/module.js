/*
MODEL FOR Module TABLE
*/
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "SISdb"
});

exports.getByModuleCode = function(moduleCode, callback) {
	sql = "SELECT * FROM Module WHERE ModuleCode= '" +moduleCode+"'";
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};

exports.getAll = function(callback) {
	sql = "SELECT * FROM Module";
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
};

exports.getTeachingStaff = function(moduleCode, callback) {
	sql = "SELECT AcademicStaff.FirstName, AcademicStaff.LastName"+
		" FROM AcademicStaff"+
		" INNER JOIN Teaching"+
		" ON AcademicStaff.id = Teaching.AcademicStaffID"+
		" WHERE Teaching.ModuleCode= '"+moduleCode+"'";
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
};

exports.getAssessingStaff = function(moduleCode, callback) {
	sql = "SELECT AcademicStaff.FirstName, AcademicStaff.LastName"+
		" FROM AcademicStaff"+
		" INNER JOIN Assessing"+
		" ON AcademicStaff.id = Assessing.AcademicStaffID"+
		" WHERE Assessing.ModuleCode= '"+moduleCode+"'";
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
};

