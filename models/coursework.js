/*

MODEL FOR Coursework managing

*/

//A reusable database wrapper
var db = require('./SISdb');

/**
  * @desc Creates a coursework entry in the database
  * @param [array] - [ModuleCode, CourseworkNumber, SetDate, DueDate, ReturnDate, Weighting, MaxMark, Notes]
  * @param function - callback 
*/
exports.addCoursework = function(coursework,callback) {
	sql = "INSERT INTO Coursework "+
	"(ModuleCode, CourseworkNumber, SetDate, DueDate, ReturnDate, Weighting, MaxMark, Notes, FileName) "+
	"VALUES ?";
	db.query(sql,[coursework], function(err, result) {
		if (err) throw err;
		callback();
    });
};

/**
  * @desc Reads all coursework of a particular module
  * @param string - ModuleCode
  * @param function - callback 
*/
exports.getCourseworkOf = function(module,callback) {
	sql = "SELECT id, ModuleCode, CourseworkNumber, SetDate, DueDate, ReturnDate ,FileName, IsApproved FROM Coursework "+
		"WHERE ModuleCode= '"+module+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
};

/**
  * @desc Updates the coursework entry by approving it
  * @param number - coursework id
  * @param function - callback 
*/
exports.approveCourseworkById = function(id,callback) {
	sql = "UPDATE Coursework "+
		"SET IsApproved = 1 "+
		"WHERE id ="+id;
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback();
    });
};

/**
  * @desc Updates the coursework entry by disapproving it
  * @param number - coursework id
  * @param function - callback 
*/
exports.disapproveCourseworkById = function(id,callback) {
	sql = "UPDATE Coursework "+
		"SET IsApproved = 0 "+
		"WHERE id ="+id;
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback();
    });
};

/**
  * @desc Reads coursework id and max mark of a particular coursework
  * @param string - ModuleCode
  * @param string - coursework id
  * @param function - callback 
*/
exports.getCwkIdAndMaxMark = function(ModuleCode, CourseworkNumber ,callback) {
	sql = "SELECT id, MaxMark "+
		"FROM Coursework "+
		"WHERE ModuleCode='"+ModuleCode+"' "+
		"AND CourseworkNumber="+CourseworkNumber;
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};

/**
  * @desc Creates a new CourseworkMark entry in the database
  * @param number - Coursework id
  * @param number - Student id
  * @param number - Raw mark
  * @param function - callback 
*/
exports.addMark = function(CourseworkID, StudentID, RawMark, callback) {
	if (RawMark==''){
		callback();
		return;
	}
	sql = "INSERT INTO CourseworkMark (CourseworkID, StudentID, RawMark) "+
		"VALUES ("+CourseworkID+","+StudentID+","+RawMark+")";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback();
    });
};

/**
  * @desc Deleting a coursework mark from the database
  * @param number - Coursework id
  * @param number - Student id
  * @param function - callback 
*/
exports.removeMark = function(CourseworkID, StudentID,callback){
	sql = "DELETE FROM CourseworkMark "+
		"WHERE CourseworkID = "+CourseworkID+
		" AND StudentID = "+StudentID;;
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback();
    });
}

/**
  * @desc Reads raw mark of the student
  * @param number - Student id
  * @param number - Coursework id
  * @param function - callback 
*/
exports.isStudentMarked = function(StudentID, CourseworkID ,callback) {
	sql = "SELECT RawMark "+
		"FROM CourseworkMark "+
		"WHERE StudentID='"+StudentID+"' "+
		"AND CourseworkID="+CourseworkID;
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};

/**
  * @desc Reads module code and coursework number of a particuar coursework
  * @param number - Coursework id
  * @param function - callback 
*/
exports.getCourseworkModuleCodeAndNumber = function(courseworkID,callback) {
	sql = "SELECT ModuleCode, CourseworkNumber FROM Coursework "+
		"WHERE id= '"+courseworkID+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]['ModuleCode'], result[0]['CourseworkNumber']);
    });
};

/**
  * @desc Reads all coursework from a current year of study of a particular module
  * @param string - Module code
  * @param string - current year of study (e.g. if academic year is 2017/2018, year of study will be 2017)
  * @param function - callback 
*/
exports.getCourseworkOfCurrentYear = function(moduleCode,yearOfStudy,callback) {
	sql = "SELECT id, ModuleCode, CourseworkNumber, SetDate, DueDate, ReturnDate ,FileName, IsApproved"+
		" FROM Coursework"+
		" WHERE ModuleCode= '"+moduleCode+"'"+
		" AND (YEAR(SetDate)='"+yearOfStudy+"'"+
		" OR YEAR(SetDate)='"+(yearOfStudy+1)+"')";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
};

/**
  * @desc Reads coursework mark of a particular student
  * @param number - student id
  * @param number - coursework id
  * @param function - callback 
*/
exports.getCourseworkMark = function(studentID,courseworkID,callback){
	sql = "SELECT RawMark"+
		" FROM CourseworkMark"+
		" WHERE CourseworkID= '"+courseworkID+"'"+
		" AND StudentID='"+studentID+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
}

/**
  * @desc Reads information of a particular coursework
  * @param number - Coursework id
  * @param function - callback 
*/
exports.getCourseworkById = function(courseworkID,callback){
	sql = "SELECT * FROM Coursework "+
		"WHERE id= '"+courseworkID+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
}

/**
  * @desc Reads current deadlines of a particular coursework
  * @param string - current year
  * @param function - callback 
*/
exports.getCurrentDeadlines = function(currentYear,callback){
	sql = "SELECT DueDate FROM Coursework "+
		"WHERE YEAR(DueDate)= '"+currentYear+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
}



