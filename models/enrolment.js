/*

MODEL FOR ENROLMENT TABLE

*/

//A reusable database wrapper
var db = require('./SISdb');


/**
  * @desc Reads enrolment information of a particular student
  * @param number - student id
  * @param function - callback 
*/
exports.getByStudentID = function(studentID, callback) {
	sql = "SELECT * FROM Enrolment "+
		"WHERE StudentID= '" +studentID+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
};

/**
  * @desc Reads Enrolments of a current year of study
  * @param string - Module Code
  * @param function - callback 
*/
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

/**
  * @desc Reads Enrolments of a current year of study of a particular student
  * @param number - student id
  * @param string - current year
  * @param string - semester
  * @param function - callback 
*/
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

/**
  * @desc Reads level of study of a student who is enrolled in a particular module
  * @param string - Module Code
  * @param number - student id
  * @param function - callback 
*/
exports.getLevel = function(moduleCode, studentID,callback){
	sql = "SELECT LevelOfStudy FROM Enrolment"+
	" WHERE StudentID= '" +studentID+"'"+
	" AND ModuleCode='"+moduleCode+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]['LevelOfStudy']);
    });
}

