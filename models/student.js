/*

MODEL FOR STUDENT TABLE

*/

//A reusable database wrapper
var db = require('./SISdb');

/**
  * @desc Reads information of a particular student
  * @param string - student username
  * @param function - callback 
*/
exports.getByUsername = function(username, callback) {
	sql = "SELECT * FROM Student WHERE username= '" +username+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};

/**
  * @desc Reads information of a particular academic staff member
  * @param number - academic staff id
  * @param function - callback 
*/
exports.getPersonalTutor = function(id, callback) {
	sql = "SELECT * FROM AcademicStaff WHERE id= " +id;
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};

/**
  * @desc Reads information of all students
  * @param function - callback 
*/
exports.getAll = function(callback) {
	sql = "SELECT Student.id , Student.FirstName, Student.LastName, Student.Username, Course.Qualification, Course.CourseName"+
		" FROM Student"+
		" INNER JOIN Course"+
		" ON Student.CourseID= Course.id";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
};

/**
  * @desc Reads information of a particular student
  * @param string - username
  * @param function - callback 
*/
exports.getIdByUsername = function(username, callback){
	sql = "SELECT id FROM Student WHERE username= '" +username+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
}