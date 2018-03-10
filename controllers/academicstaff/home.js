/*
CONTROLLER 
*/
var express = require('express')
    ,router = express.Router()
    AcademicStaff = require('../../models/academicstaff');


router.get('/academicstaff/home', function(req, res) {
	username = req.session.user;

	AcademicStaff.get(username,function(result){
		res.render("academicstaff_home",{academicstaff:result});
	});
});

module.exports = router;