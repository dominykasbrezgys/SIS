/*

MODEL FOR retrieving week dates

*/

//A reusable database wrapper
var db = require('./SISdb');

/**
  * @desc Reads week dates of a particular year of study
  * @param string - Year of study
  * @param number - semester
  * @param function - callback 
*/
exports.getWeeksByYearOfStudy = function(yearOfStudy,semester,callback) {
	sql = "SELECT * FROM SemesterWeek"+
		" WHERE YearOfStudy= '" +yearOfStudy+"'"+
		" AND SemesterNumber= "+semester;
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
};