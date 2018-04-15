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