/*
Academic Staff MODEL
*/
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "SISdb"
});

exports.getByUsername = function(username, callback) {
	sql = "SELECT * FROM AcademicStaff WHERE username= '" +username+"'";
	con.query(sql, function(err, result) {
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
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
};
