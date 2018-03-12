/*
CONTROLLER 
*/
var express = require('express')
    ,router = express.Router()
    ,AcademicStaff = require('../../models/academicstaff')
    ,Student = require('../../models/student');


router.get('/academicstaff/coursework', function(req, res) {
	username = req.session.user;
	res.render("academicstaff_coursework");
});

module.exports = router;