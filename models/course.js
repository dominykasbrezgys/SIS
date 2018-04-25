/*

MODEL FOR COURSE TABLE

*/

//A reusable database wrapper
var db = require('./SISdb');

/**
  * @desc Reads all information of a Course
  * @param number - Course id
  * @param function - callback 
*/
exports.getById = function(id, callback) {
	sql = "SELECT * FROM Course WHERE id= '" +id+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};

/**
  * @desc Reads duration of a particular course
  * @param number - Course id
  * @param function - callback 
*/
exports.getDuration = function(id, callback) {
	sql = "SELECT Duration FROM Course WHERE id= '" +id+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};
