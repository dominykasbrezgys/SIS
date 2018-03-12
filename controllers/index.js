/*
CONTROLLER
index.js purpose is to load all other controllers and maybe define
some paths which don’t have a common prefix like a home page route for example.
*/

var express = require('express')
  , mysql = require('mysql')
  , router = express.Router()
  , User = require('../models/user')
  , auth = require('../middlewares/auth');

//Loading all controllers
router.use(require('./student/home'));
router.use(require('./academicstaff/home'));

router.get('/', function(req, res) {
	if (req.session.user){
		res.redirect('/home');
	}
	else {
	res.render('index');
	}
});

router.post('/login', function(req, res) {
    username = req.body.username;
    password = req.body.password;

    User.get(username, function(result){
    	if (result.length == 0){
    		//wrong username or password
    		res.redirect('/');
    	} 
    	else if ( username == result[0]['Username'] && password == result[0]['Password']){
    		req.session.user = result[0]['Username'];
    		req.session.type = result[0]['Type'];
    		res.redirect('home');
    	}
    	else{
    		res.redirect('/');
    	}
    });
});

router.get('/home', function(req, res) {
    	if(req.session.type == 'student'){
    		res.redirect("/student/home");
    	}
    	else if(req.session.type == 'academicstaff'){
    		res.redirect("/academicstaff/home");
    	}
});

module.exports = router;