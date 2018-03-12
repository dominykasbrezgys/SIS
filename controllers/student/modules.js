/*
CONTROLLER 
*/
var express = require('express')
    ,router = express.Router()
    ,Student = require('../../models/student')
    ,Course = require('../../models/course');

router.get('/student/modules', function(req, res) {
	username = req.session.user;
	res.render("student_modules");
});

module.exports = router;