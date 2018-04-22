/*

MODEL FOR Coursework managing

*/

//A reusable database wrapper
var db = require('./SISdb');

exports.addCoursework = function(coursework,callback) {
	sql = "INSERT INTO Coursework "+
	"(ModuleCode, CourseworkNumber, SetDate, DueDate, ReturnDate, Weighting, MaxMark, Notes, FileName) "+
	"VALUES ?";
	db.query(sql,[coursework], function(err, result) {
		if (err) throw err;
		callback();
    });
};

exports.getCourseworkOf = function(module,callback) {
	sql = "SELECT id, ModuleCode, CourseworkNumber, SetDate, DueDate, ReturnDate ,FileName, IsApproved FROM Coursework "+
		"WHERE ModuleCode= '"+module+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
};

exports.approveCourseworkById = function(id,callback) {
	sql = "UPDATE Coursework "+
		"SET IsApproved = 1 "+
		"WHERE id ="+id;
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback();
    });
};

exports.disapproveCourseworkById = function(id,callback) {
	sql = "UPDATE Coursework "+
		"SET IsApproved = 0 "+
		"WHERE id ="+id;
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback();
    });
};

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

exports.removeMark = function(CourseworkID, StudentID,callback){
	sql = "DELETE FROM CourseworkMark "+
		"WHERE CourseworkID = "+CourseworkID+
		" AND StudentID = "+StudentID;;
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback();
    });
}

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

exports.getCourseworkModuleCodeAndNumber = function(courseworkID,callback) {
	sql = "SELECT ModuleCode, CourseworkNumber FROM Coursework "+
		"WHERE id= '"+courseworkID+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]['ModuleCode'], result[0]['CourseworkNumber']);
    });
};

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

exports.getCourseworkById = function(courseworkID,callback){
	sql = "SELECT * FROM Coursework "+
		"WHERE id= '"+courseworkID+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
}

exports.getCurrentDeadlines = function(currentYear,callback){
	sql = "SELECT DueDate FROM Coursework "+
		"WHERE YEAR(DueDate)= '"+currentYear+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
}



