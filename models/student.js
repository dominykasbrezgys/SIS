/*

MODEL FOR STUDENT TABLE

*/

//A reusable database wrapper
var db = require('./SISdb');

exports.getByUsername = function(username, callback) {
	sql = "SELECT * FROM Student WHERE username= '" +username+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};

exports.getPersonalTutor = function(id, callback) {
	sql = "SELECT * FROM AcademicStaff WHERE id= " +id;
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};

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

exports.getIdByUsername = function(username, callback){
	sql = "SELECT id FROM Student WHERE username= '" +username+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
}