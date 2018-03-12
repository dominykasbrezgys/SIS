/*
CONTROLLER 
*/
var express = require('express')
    ,router = express.Router()
    ,Student = require('../../models/student')
    ,Course = require('../../models/course');

router.get('/student/coursework', function(req, res) {
	username = req.session.user;
	res.render("student_coursework");
});

module.exports = router;