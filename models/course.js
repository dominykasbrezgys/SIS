/*

MODEL FOR COURSE TABLE

*/

//A reusable database wrapper
var db = require('./SISdb');

exports.getById = function(id, callback) {
	sql = "SELECT * FROM Course WHERE id= '" +id+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};

exports.getDuration = function(id, callback) {
	sql = "SELECT Duration FROM Course WHERE id= '" +id+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};
