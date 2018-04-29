app = require('../app');
var expect = require('chai').expect;
var request = require('supertest');


const academicstaffCredentials = {
  username: 'scottie.miller', 
  password: 'pass'
}
const studentCredentials = {
  username: 'ma16ra', 
  password: 'pass'
}

var authenticatedUser = request.agent(app);

describe('Endpoints test', function() {

	describe('Redirect if not logged in',function(){
		it('/academicstaff/home', function(done) {
	    	request(app)
  			.get('/academicstaff')
  			.expect(302)
  			.end(function(err, res){
    		if (err) throw err;
    		done();
  			});
		});
	});

	describe('Academicstaff',function(){

		//Log in
		before(function(done){
			authenticatedUser
		  		.post('/login')
		  		.send(academicstaffCredentials)
		    	.type('form')
		    	.expect(302)
		    	.end(function(err, response){
		      		done();
		    	});
		});

		//Log out
		after(function(done) {
			authenticatedUser
		  	.get('/logout')
		  	.expect(302)
		    .end(function(err, response){
		      done();
		    });
  		});

		it('/academicstaff/home', function(done) {
			authenticatedUser
				.get('/academicstaff/home')
				.expect(200)
				.expect('content-type', 'text/html; charset=utf-8')
				.end(function(err, res){
					if (err) throw err;
					done();
				});
		});
		it('/academicstaff/allmodules', function(done) {
			authenticatedUser
				.get('/academicstaff/allmodules')
				.expect(200)
				.expect('content-type', 'text/html; charset=utf-8')
				.end(function(err, res){
					if (err) throw err;
					done();
				});
		});
		it('/academicstaff/assessedmodules', function(done) {
			authenticatedUser
				.get('/academicstaff/assessedmodules')
				.expect(200)
				.expect('content-type', 'text/html; charset=utf-8')
				.end(function(err, res){
					if (err) throw err;
					done();
				});
		});
		it('/academicstaff/taughtmodules', function(done) {
			authenticatedUser
				.get('/academicstaff/taughtmodules')
				.expect(200)
				.expect('content-type', 'text/html; charset=utf-8')
				.end(function(err, res){
					if (err) throw err;
					done();
				});
		});
		it('/academicstaff/coursework/invalidDeadline/:date', function(done) {
			authenticatedUser
				.get('/academicstaff/coursework/invalidDeadline/2018-04-20')
				.expect(200)
				.expect('content-type', 'text/html; charset=utf-8')
				.end(function(err, res){
					if (err) throw err;
					done();
				});
		});
		it('/academicstaff/coursework/successfullyAdded', function(done) {
			authenticatedUser
				.get('/academicstaff/coursework/successfullyAdded')
				.expect(200)
				.expect('content-type', 'text/html; charset=utf-8')
				.end(function(err, res){
					if (err) throw err;
					done();
				});
		});	
		it('/academicstaff/coursework/assess', function(done) {
			authenticatedUser
				.get('/academicstaff/coursework/assess')
				.expect(200)
				.expect('content-type', 'text/html; charset=utf-8')
				.end(function(err, res){
					if (err) throw err;
					done();
				});
		});
		it('/academicstaff/coursework/download/:filename', function(done) {
			authenticatedUser
				.get('/academicstaff/coursework/download/CWK_FOR_TESTING.pdf')
				.expect(200)
				.expect('content-type', 'application/pdf')
				.end(function(err, res){
					if (err) throw err;
					done();
				});
		});
		it('/academicstaff/coursework/mark', function(done) {
			authenticatedUser
				.get('/academicstaff/coursework/mark')
				.expect(200)
				.expect('content-type', 'text/html; charset=utf-8')
				.end(function(err, res){
					if (err) throw err;
					done();
				});
		});
		it('/academicstaff/exams/add', function(done) {
			authenticatedUser
				.get('/academicstaff/exams/add')
				.expect(200)
				.expect('content-type', 'text/html; charset=utf-8')
				.end(function(err, res){
					if (err) throw err;
					done();
				});
		});
		it('/academicstaff/exams/add/success', function(done) {
			authenticatedUser
				.get('/academicstaff/exams/add/success')
				.expect(200)
				.expect('content-type', 'text/html; charset=utf-8')
				.end(function(err, res){
					if (err) throw err;
					done();
				});
		});
		it('/academicstaff/exams/assess', function(done) {
			authenticatedUser
				.get('/academicstaff/exams/assess')
				.expect(200)
				.expect('content-type', 'text/html; charset=utf-8')
				.end(function(err, res){
					if (err) throw err;
					done();
				});
		});
		it('/academicstaff/exams/download/:filename', function(done) {
			authenticatedUser
				.get('/academicstaff/exams/download/EXAM_FOR_TESTING.pdf')
				.expect(200)
				.expect('content-type', 'application/pdf')
				.end(function(err, res){
					if (err) throw err;
					done();
				});
		});
		it('/academicstaff/exams/mark', function(done) {
			authenticatedUser
				.get('/academicstaff/exams/mark')
				.expect(200)
				.expect('content-type', 'text/html; charset=utf-8')
				.end(function(err, res){
					if (err) throw err;
					done();
				});
		});
	});

	describe('Student',function(){

		//Log in
		before(function(done){
			authenticatedUser
		  		.post('/login')
		  		.send(studentCredentials)
		    	.type('form')
		    	.expect(302)
		    	.end(function(err, response){
		      		done();
		    	});
		});

		//Log out
		after(function(done) {
			authenticatedUser
		  	.get('/logout')
		  	.expect(302)
		    .end(function(err, response){
		      done();
		    });
  		});

		it('/student/home', function(done) {
			authenticatedUser
				.get('/student/home')
				.expect(200)
				.expect('content-type', 'text/html; charset=utf-8')
				.end(function(err, res){
					if (err) throw err;
					done();
				});
		});
		it('/student/modules', function(done) {
			authenticatedUser
				.get('/student/modules')
				.expect(200)
				.expect('content-type', 'text/html; charset=utf-8')
				.end(function(err, res){
					if (err) throw err;
					done();
				});
		});
		it('/student/coursework/:semester=1', function(done) {
			authenticatedUser
				.get('/student/coursework/1')
				.expect(200)
				.expect('content-type', 'text/html; charset=utf-8')
				.end(function(err, res){
					if (err) throw err;
					done();
				});
		});
		it('/student/coursework/:semester=2', function(done) {
			authenticatedUser
				.get('/student/coursework/2')
				.expect(200)
				.expect('content-type', 'text/html; charset=utf-8')
				.end(function(err, res){
					if (err) throw err;
					done();
				});
		});
		it('/student/exams', function(done) {
			authenticatedUser
				.get('/student/exams')
				.expect(200)
				.expect('content-type', 'text/html; charset=utf-8')
				.end(function(err, res){
					if (err) throw err;
					done();
				});
		});	
	});
});
