/*
CONTROLLER 
*/
var express = require('express')
    ,router = express.Router()
    ,Student = require('../../models/student')
    ,Enrolment = require('../../models/enrolment')
    ,Exam = require('../../models/exam');

/*
Route to display exam marks of a student
*/
router.get('/student/exams', function(req, res) {
	username = req.session.user;

	data = [];

	//Identifying the student
	Student.getByUsername(username, function(student){
		//Get information about the exam mark of that student (see models for attributes returned)
		Exam.getExamMarksInfo(student['id'],function(marksInfo){
			//If no exam marks - render the page with no data
			if (marksInfo.length == 0){
				res.render("student_exams");
			}
			marksInfo.forEach(function(mark){
				//Need to know how many levels has the Student studied
				Enrolment.getLevel(mark['ModuleCode'],student['id'],function(level){
					mark['Level'] = level;
					if (mark == marksInfo[marksInfo.length -1]){
						//Calculate distinct values of levels for easier table rendering
						var levels = [];
						for(i = 0; i< marksInfo.length; i++){    
    						if(levels.indexOf(marksInfo[i].Level) === -1){
        						levels.push(marksInfo[i].Level);
    						} 
    						if (i+1 == marksInfo.length){
        						res.render("student_exams",{data:marksInfo, levels:levels});
        					}
						}
					}
				});
			});
		});
	});
});

module.exports = router;