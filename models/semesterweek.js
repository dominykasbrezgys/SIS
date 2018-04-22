/*

MODEL FOR retrieving week dates

*/

//A reusable database wrapper
var db = require('./SISdb');

exports.getWeeksByYearOfStudy = function(yearOfStudy,semester,callback) {
	sql = "SELECT * FROM SemesterWeek"+
		" WHERE YearOfStudy= '" +yearOfStudy+"'"+
		" AND SemesterNumber= "+semester;
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
};