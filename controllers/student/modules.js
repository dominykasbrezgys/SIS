/*
CONTROLLER 
*/
var express = require('express')
    ,router = express.Router()
    ,Student = require('../../models/student')
    ,Module = require('../../models/module')
    ,Enrolment = require('../../models/enrolment');

/*
Route for displaying modules that a student is enrolled on
*/
router.get('/student/modules', function(req, res) {
	username = req.session.user;
	modules = [];

	//Identifying the student
	Student.getByUsername(username, function(student){
		//Getting enrolments of that student
		Enrolment.getByStudentID(student['id'], function(enrolments){
			//Compose modules array for page renedering (Module & Enrolment models used)
			enrolments.forEach(function(enrolment){
				Module.getByModuleCode(enrolment['ModuleCode'],function(module){
					modules.push({
						ModuleCode : enrolment['ModuleCode'],
						ModuleName : module['ModuleName'],
						NumberOfCredits : module['NumberOfCredits'],
						YearTaken : enrolment['YearTaken'],
						OverallResult : enrolment['OverallResult']
					});
					//When all information obtained - render the page
					if (modules.length == enrolments.length){
						res.render("student_modules",{student:student, 
							modules: modules });
					}
				});
			});
		});
	});
});

module.exports = router;