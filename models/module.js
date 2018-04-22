/*

MODEL FOR retrieving info about Modules

*/

//A reusable database wrapper
var db = require('./SISdb');

exports.getByModuleCode = function(moduleCode, callback) {
	sql = "SELECT * FROM Module WHERE ModuleCode= '" +moduleCode+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};

exports.getAll = function(callback) {
	sql = "SELECT * FROM Module";
	db.query(sql, function(err, result) {
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
	db.query(sql, function(err, result) {
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
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
};

exports.getModulesAssessedByUsername = function(staffUsername, callback) {

	sql = "SELECT AcademicStaff.FirstName, AcademicStaff.LastName, Module.ModuleName, Module.ModuleCode, Module.NumberOfCredits"+
		" FROM AcademicStaff"+
		" INNER JOIN Assessing"+
		" ON AcademicStaff.id = Assessing.AcademicStaffID"+
		" INNER JOIN Module"+
		" ON Assessing.ModuleCode = Module.ModuleCode"+
		" WHERE AcademicStaff.Username='"+staffUsername+"'";

	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
};

exports.getModulesTaughtByUsername = function(staffUsername, callback) {

	sql = "SELECT AcademicStaff.FirstName, AcademicStaff.LastName, Module.ModuleName, Module.ModuleCode, Module.NumberOfCredits"+
		" FROM AcademicStaff"+
		" INNER JOIN Teaching"+
		" ON AcademicStaff.id = Teaching.AcademicStaffID"+
		" INNER JOIN Module"+
		" ON Teaching.ModuleCode = Module.ModuleCode"+
		" WHERE AcademicStaff.Username='"+staffUsername+"'";

	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
};


