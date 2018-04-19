/*
MODEL FOR retrieving week dates
*/
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "SISdb"
});

exports.getWeeksByYearOfStudy = function(yearOfStudy,semester,callback) {
	sql = "SELECT * FROM SemesterWeek"+
		" WHERE YearOfStudy= '" +yearOfStudy+"'"+
		" AND SemesterNumber= "+semester;
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
};