/*
MODEL FOR Module TABLE
*/
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "SISdb"
});

exports.getByModuleCode = function(moduleCode, callback) {
	sql = "SELECT * FROM Module WHERE ModuleCode= '" +moduleCode+"'";
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};