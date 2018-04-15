/*
MODEL FOR Coursework managing
*/
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "SISdb"
});

exports.addCoursework = function(coursework,callback) {
	sql = "INSERT INTO Coursework "+
	"(ModuleCode, CourseworkNumber, SetDate, DueDate, ReturnDate, Weighting, MaxMark, Notes, FileName) "+
	"VALUES ?";
	con.query(sql,[coursework], function(err, result) {
		if (err) throw err;
		callback();
    });
};

exports.getCourseworkOf = function(module,callback) {
	sql = "SELECT id, ModuleCode, CourseworkNumber, FileName, IsApproved FROM Coursework "+
		"WHERE ModuleCode= '"+module+"'";
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
};

exports.approveCourseworkById = function(id,callback) {
	sql = "UPDATE Coursework "+
		"SET IsApproved = 1 "+
		"WHERE id ="+id;
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback();
    });
};

exports.disapproveCourseworkById = function(id,callback) {
	sql = "UPDATE Coursework "+
		"SET IsApproved = 0 "+
		"WHERE id ="+id;
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback();
    });
};

exports.getCwkIdAndMaxMark = function(ModuleCode, CourseworkNumber ,callback) {
	sql = "SELECT id, MaxMark "+
		"FROM Coursework "+
		"WHERE ModuleCode='"+ModuleCode+"' "+
		"AND CourseworkNumber="+CourseworkNumber;
	con.query(sql, function(err, result) {
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
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback();
    });
};

exports.removeMark = function(CourseworkID, StudentID,callback){
	sql = "DELETE FROM CourseworkMark "+
		"WHERE CourseworkID = "+CourseworkID+
		" AND StudentID = "+StudentID;;
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback();
    });
}

exports.isStudentMarked = function(StudentID, CourseworkID ,callback) {
	sql = "SELECT RawMark "+
		"FROM CourseworkMark "+
		"WHERE StudentID='"+StudentID+"' "+
		"AND CourseworkID="+CourseworkID;
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};

exports.getCourseworkById = function(id,callback) {
	sql = "SELECT ModuleCode, CourseworkNumber FROM Coursework "+
		"WHERE id= '"+id+"'";
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]['ModuleCode'], result[0]['CourseworkNumber']);
    });
};


