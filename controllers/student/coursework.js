/*
CONTROLLER 
*/
var express = require('express')
    ,router = express.Router()
    ,Student = require('../../models/student')
    ,Enrolment = require('../../models/enrolment')
    ,Coursework = require('../../models/coursework')
    ,SemesterWeek = require('../../models/semesterweek')
    ,Course = require('../../models/course');


/*
Route to view coursework dates and marks by semester
*/
router.get('/student/coursework/:semester', function(req, res) {
	username = req.session.user;

	//Get current year of study
    var today = new Date();
    var month = today.getMonth()+1;
    var yearOfStudy = today.getFullYear();
    //If current month is from January to August, subtract one
    if( 1<= month < 9){
        yearOfStudy-=1;
    }

    data = [];
    //Get student ID
    Student.getIdByUsername(username, function(StudentID){
    	//Get all modules currently enrolled by that student
		Enrolment.getCurrentlyEnrolledModules(StudentID['id'], yearOfStudy, req.params['semester'], function(modules){
			//Get coursework of these modules that were uploaded this academic year
			modules.forEach(function(module){
				Coursework.getCourseworkOfCurrentYear(module['ModuleCode'],yearOfStudy,function(coursework){

					//If no coursework on the last module - render page
					if((coursework.length) == 0 &&
						(module == modules[modules.length-1])){
						SemesterWeek.getWeeksByYearOfStudy(yearOfStudy,req.params['semester'],function(weeks){
							res.render("student_coursework",{data:data, weeks:weeks, today:today, studentID: StudentID['id'] });
						});	
					}
					coursework.forEach(function(cwk){
						data.push({
							CourseworkID : cwk['id'],
							ModuleCode : cwk['ModuleCode'],
							CourseworkNumber : cwk['CourseworkNumber'],
							SetDate : cwk['SetDate'],
							DueDate : cwk['DueDate'],
							ReturnDate : cwk['ReturnDate']
						});
						//If the last coursework reached of the last module - get weeks of current semester and render page
						if((module == modules[modules.length-1]) &&
							(cwk == coursework[coursework.length-1])){
							SemesterWeek.getWeeksByYearOfStudy(yearOfStudy,req.params['semester'],function(weeks){
								res.render("student_coursework",{data:data, weeks:weeks, today:today, studentID: StudentID['id'] });
							});	
						}
					});
				});
			});
		});
    })
});

/*
Route to view a mark of individual coursework
*/
router.get('/student/coursework/mark/:CourseworkID', function(req, res) {
	username = req.session.user;

	Student.getIdByUsername(username, function(StudentID){
		//Get coursework information
		Coursework.getCourseworkById(req.params['CourseworkID'],function(cwk){
			//Get Student mark of that coursework
			Coursework.getCourseworkMark(StudentID['id'],req.params['CourseworkID'],function(mark){
				res.render('student_coursework_mark',{mark:mark,cwk:cwk});
			});
		});
	});

});


module.exports = router;