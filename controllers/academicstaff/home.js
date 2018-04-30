/*
CONTROLLER 
*/
var express = require('express')
    ,router = express.Router()
    ,AcademicStaff = require('../../models/academicstaff')
    ,Student = require('../../models/student');

/*
Route to display a home page of the academic staff
*/
router.get('/academicstaff/home', function(req, res) {
	username = req.session.user;

	AcademicStaff.getByUsername(username,function(academicstaff){
		AcademicStaff.getPersonalTutees(academicstaff['id'], function(personal_tutees){
			Student.getAll(function(students){
				res.render("academicstaff_home",{academicstaff:academicstaff, 
					personal_tutees:personal_tutees, 
					students:students});
			});
		});
	});
});

module.exports = router;