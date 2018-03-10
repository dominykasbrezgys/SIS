/*
CONTROLLER 
*/
var express = require('express')
    ,router = express.Router()
    Student = require('../../models/student');

router.get('/student/home', function(req, res) {
	username = req.session.user;

	Student.get(username,function(result){
		res.render("student_home",{student:result});
	});
});

module.exports = router;