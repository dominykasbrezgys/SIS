/*

MODEL FOR Teaching table

*/

//A reusable database wrapper
var db = require('./SISdb');

/**
  * @desc Reads all modules taught of a particular academic staff member
  * @param string - AcademicStaff username
  * @param function - callback 
*/
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