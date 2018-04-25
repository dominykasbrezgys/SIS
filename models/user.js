/*
MODEL FOR USER ATHENTICATION
*/

//A reusable database wrapper
var db = require('./SISdb');

/**
  * @desc Reads all information of a particular user
  * @param string - username
  * @param function - callback 
*/
exports.get = function(username, callback){
	sql = "SELECT * FROM User where username= '"+username+"'";
	db.query(sql, function(err, result) {
    if (err) throw err;
    callback(result);
    });
};