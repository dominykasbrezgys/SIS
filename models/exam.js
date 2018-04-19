/*
MODEL FOR retrieving info about Exams
*/
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "SISdb"
});

exports.addExam = function(exam,callback){

	sql = "INSERT INTO Exam "+
		"(ModuleCode, Weighting, MaxMark, FileName) "+
		"VALUES ?";

	con.query(sql,[exam],function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
}

exports.getExamOf = function(module,callback) {
	sql = "SELECT id, ModuleCode, FileName, IsApproved FROM Exam "+
		"WHERE ModuleCode= '"+module+"'";
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};

exports.approveExamById = function(id,callback) {
	sql = "UPDATE Exam "+
		"SET IsApproved = 1 "+
		"WHERE id ="+id;
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback();
    });
};

exports.disapproveExamById = function(id,callback) {
	sql = "UPDATE Exam "+
		"SET IsApproved = 0 "+
		"WHERE id ="+id;
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback();
    });
};

exports.getExamIdAndMaxMark = function(ModuleCode, callback) {
	sql = "SELECT id, MaxMark "+
		"FROM Exam "+
		"WHERE ModuleCode='"+ModuleCode+"'";
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};

exports.isStudentMarked = function(StudentID, ExamID ,callback) {
	sql = "SELECT RawMark "+
		"FROM ExamMark "+
		"WHERE StudentID='"+StudentID+"' "+
		"AND ExamID="+ExamID;
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};

exports.addMark = function(ExamID, StudentID, RawMark, callback) {
	if (RawMark==''){
		callback();
		return;
	}
	sql = "INSERT INTO ExamMark (ExamID, StudentID, RawMark) "+
		"VALUES ("+ExamID+","+StudentID+","+RawMark+")";
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback();
    });
};

exports.removeMark = function(ExamID, StudentID,callback){
	sql = "DELETE FROM ExamMark "+
		"WHERE ExamID = "+ExamID+
		" AND StudentID = "+StudentID;;
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback();
    });
}

exports.getExamById = function(id,callback) {
	sql = "SELECT ModuleCode FROM Exam "+
		"WHERE id= '"+id+"'";
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]['ModuleCode']);
    });
};


exports.getExamMarksInfo = function(StudentID, callback){
	sql = "SELECT Module.ModuleCode, Module.ModuleName, Exam.MaxMark, Exam.Weighting, ExamMark.RawMark"+
		" FROM Module"+
		" INNER JOIN Exam ON Module.ModuleCode=Exam.ModuleCode"+
		" INNER JOIN ExamMark ON Exam.id = ExamMark.ExamID"+
		" WHERE ExamMark.StudentID="+StudentID;
	con.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });

};


