/*

MODEL FOR retrieving info about Exams

*/


//A reusable database wrapper
var db = require('./SISdb');

/**
  * @desc Creates a new entry of an exam in the database
  * @param [array] - [ModuleCode, Weighting, MaxMark, FileName]
*/
exports.addExam = function(exam,callback){
	sql = "INSERT INTO Exam "+
		"(ModuleCode, Weighting, MaxMark, FileName) "+
		"VALUES ?";
	db.query(sql,[exam],function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
}

/**
  * @desc Reads an exam of a particular module
  * @param string - Module Code
  * @param function - callback 
*/
exports.getExamOf = function(module,callback) {
	sql = "SELECT id, ModuleCode, FileName, IsApproved FROM Exam "+
		"WHERE ModuleCode= '"+module+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};

/**
  * @desc Updates the exam entry in the database by setting the isApproved field to true
  * @param number - exam id
  * @param function - callback 
*/
exports.approveExamById = function(id,callback) {
	sql = "UPDATE Exam "+
		"SET IsApproved = 1 "+
		"WHERE id ="+id;
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback();
    });
};

/**
  * @desc Updates the exam entry in the database by setting the isApproved field to false
  * @param number - exam id
  * @param function - callback 
*/
exports.disapproveExamById = function(id,callback) {
	sql = "UPDATE Exam "+
		"SET IsApproved = 0 "+
		"WHERE id ="+id;
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback();
    });
};

/**
  * @desc Reads id and maxmark of a particular exam
  * @param string - Module Code
  * @param function - callback 
*/
exports.getExamIdAndMaxMark = function(ModuleCode, callback) {
	sql = "SELECT id, MaxMark "+
		"FROM Exam "+
		"WHERE ModuleCode='"+ModuleCode+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};

/**
  * @desc Reads if a particular student has already been marked for the exam
  * @param number - student id
  * @param number - exam id
  * @param function - callback 
*/
exports.isStudentMarked = function(StudentID, ExamID ,callback) {
	sql = "SELECT RawMark "+
		"FROM ExamMark "+
		"WHERE StudentID='"+StudentID+"' "+
		"AND ExamID="+ExamID;
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]);
    });
};

/**
  * @desc Creates a new exam mark entry in the database
  * @param number - exam id
  * @param number - student id
  * @param number - raw mark
  * @param function - callback 
*/
exports.addMark = function(ExamID, StudentID, RawMark, callback) {
	if (RawMark==''){
		callback();
		return;
	}
	sql = "INSERT INTO ExamMark (ExamID, StudentID, RawMark) "+
		"VALUES ("+ExamID+","+StudentID+","+RawMark+")";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback();
    });
};

/**
  * @desc Deletes exam mark entry in the database
  * @param number - exam id
  * @param number - student id
  * @param function - callback 
*/
exports.removeMark = function(ExamID, StudentID,callback){
	sql = "DELETE FROM ExamMark "+
		"WHERE ExamID = "+ExamID+
		" AND StudentID = "+StudentID;;
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback();
    });
}

/**
  * @desc Reads module code of a particular exam 
  * @param number - exam id
  * @param function - callback 
*/
exports.getExamById = function(id,callback) {
	sql = "SELECT ModuleCode FROM Exam "+
		"WHERE id= '"+id+"'";
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result[0]['ModuleCode']);
    });
};

/**
  * @desc Reads information of a particular exam mark
  * @param number - student id
  * @param function - callback 
*/
exports.getExamMarksInfo = function(StudentID, callback){
	sql = "SELECT Module.ModuleCode, Module.ModuleName, Exam.MaxMark, Exam.Weighting, ExamMark.RawMark"+
		" FROM Module"+
		" INNER JOIN Exam ON Module.ModuleCode=Exam.ModuleCode"+
		" INNER JOIN ExamMark ON Exam.id = ExamMark.ExamID"+
		" WHERE ExamMark.StudentID="+StudentID;
	db.query(sql, function(err, result) {
		if (err) throw err;
		callback(result);
    });
};


