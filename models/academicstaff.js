/*
Academic Staff MODEL
*/

//A reusable database wrapper
var db = require('./SISdb');

exports.getByUsername = function(username, callback) {
	sql = "SELECT * FROM AcademicStaff WHERE username= '" +username+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};

exports.getPersonalTutees = function(id, callback) {
	sql = "SELECT Student.id , Student.FirstName, Student.LastName, Student.Username, Course.Qualification, Course.CourseName"+
	" FROM Student"+
	" INNER JOIN Course"+
	" ON Student.CourseID= Course.id"+
	" WHERE Student.PersonalTutorID='"+id+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
};
