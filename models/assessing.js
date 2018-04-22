/*

MODEL FOR Assessing table

*/

//A reusable database wrapper
var db = require('./SISdb');

exports.getModulesAssessedBy = function(username, callback){
	sql = "SELECT Assessing.ModuleCode"+
		" FROM Assessing"+
		" INNER JOIN AcademicStaff"+
		" ON AcademicStaff.id = Assessing.AcademicStaffID"+
		" WHERE AcademicStaff.Username= '"+username+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
}