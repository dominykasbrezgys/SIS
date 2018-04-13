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

exports.getModulesAssessedBy = function(username, callback){
	sql = "SELECT Assessing.ModuleCode"+
		" FROM Assessing"+
		" INNER JOIN AcademicStaff"+
		" ON AcademicStaff.id = Assessing.AcademicStaffID"+
		" WHERE AcademicStaff.Username= '"+username+"'";
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
}