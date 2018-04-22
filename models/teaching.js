/*

MODEL FOR Teaching table

*/

//A reusable database wrapper
var db = require('./SISdb');

exports.getModulesTaughtBy = function(username, callback){
	sql = "SELECT Teaching.ModuleCode"+
		" FROM teaching"+
		" INNER JOIN AcademicStaff"+
		" ON AcademicStaff.id = Teaching.AcademicStaffID"+
		" WHERE AcademicStaff.Username= '"+username+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
}