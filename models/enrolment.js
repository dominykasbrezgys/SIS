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
	sql = "SELECT * FROM Enrolment "+
		"WHERE StudentID= '" +studentID+"'";
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
};

exports.getCurrentEnrollments = function(ModuleCode,CurrentYear,callback) {

	sql = "SELECT Student.id FROM Enrolment"+
		" INNER JOIN Student"+
		" ON Enrolment.StudentID = Student.id"+
		" WHERE Enrolment.ModuleCode='"+ModuleCode+"'"+
		" AND Enrolment.YearTaken='"+CurrentYear+"'";
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
};

exports.getCurrentlyEnrolledModules = function(StudentID,CurrentYear,Semester,callback) {

	sql = "SELECT Enrolment.ModuleCode FROM Enrolment"+
		" INNER JOIN Module"+
		" ON Enrolment.ModuleCode = Module.ModuleCode"+
		" WHERE Enrolment.StudentID="+StudentID+
		" AND Enrolment.YearTaken='"+CurrentYear+"'"+
		" AND (Module.Semester='"+Semester+"'" +
		" OR Module.Semester = '1/2')";
	con.query(sql, function(err, result) {
		if (err) throw err;

		callback(result);
    });
};

exports.getLevel = function(moduleCode, studentID,callback){
	sql = "SELECT LevelOfStudy FROM Enrolment"+
	" WHERE StudentID= '" +studentID+"'"+
	" AND ModuleCode='"+moduleCode+"'";
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]['LevelOfStudy']);
    });
}

