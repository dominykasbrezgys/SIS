/*
MODEL FOR USER ATHENTICATION
*/

//A reusable database wrapper
var db = require('./SISdb');

exports.get = function(username, callback){
	sql = "SELECT * FROM User where username= '"+username+"'";
	db.query(sql, function(err, result) {
    if (err) throw err;
    callback(result);
    });
};