/*
MODEL FOR Teaching table
*/
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "SISdb"
});

exports.getModulesTaughtBy = function(username, callback){
	sql = "SELECT Teaching.ModuleCode"+
		" FROM teaching"+
		" INNER JOIN AcademicStaff"+
		" ON AcademicStaff.id = Teaching.AcademicStaffID"+
		" WHERE AcademicStaff.Username= '"+username+"'";
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
}