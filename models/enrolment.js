/*

MODEL FOR ENROLMENT TABLE

*/

//A reusable database wrapper
var db = require('./SISdb');

exports.getByStudentID = function(studentID, callback) {
	sql = "SELECT * FROM Enrolment "+
		"WHERE StudentID= '" +studentID+"'";
	db.query(sql, function(err, result) {
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
	db.query(sql, function(err, result) {
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
	db.query(sql, function(err, result) {
		if (err) throw err;

		callback(result);
    });
};

exports.getLevel = function(moduleCode, studentID,callback){
	sql = "SELECT LevelOfStudy FROM Enrolment"+
	" WHERE StudentID= '" +studentID+"'"+
	" AND ModuleCode='"+moduleCode+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]['LevelOfStudy']);
    });
}

