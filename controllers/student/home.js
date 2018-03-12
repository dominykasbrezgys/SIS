/*
CONTROLLER 
*/
var express = require('express')
    ,router = express.Router()
    ,Student = require('../../models/student')
    ,Course = require('../../models/course');

router.get('/student/home', function(req, res) {
	username = req.session.user;

	Student.getByUsername(username,function(student){
		Student.getPersonalTutor(student['PersonalTutorID'], function(academicstaff){
			Course.getById(student['CourseID'],function(course){
				res.render("student_home",{student: student, 
					academicstaff: academicstaff,
					course: course });
			});
		});
	});
});

module.exports = router;