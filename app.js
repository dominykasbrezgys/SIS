
var mysql = require('mysql');
var express = require("express");
var app = express();
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "SISdb"
});

app.get("/academicstaff", function(request, response) {
    con.query("SELECT * FROM AcademicStaff", function(err, result) {
        if (err) throw err;
        response.send(result);
    });
});

app.get("/assessing", function(request, response) {
    con.query("SELECT * FROM Assessing", function(err, result) {
        if (err) throw err;
        response.send(result);
    });
});

app.get("/course", function(request, response) {
    con.query("SELECT * FROM Course", function(err, result) {
        if (err) throw err;
        response.send(result);
    });
});

app.get("/coursemodule", function(request, response) {
    con.query("SELECT * FROM CourseModule", function(err, result) {
        if (err) throw err;
        response.send(result);
    });
});

app.get("/enrolment", function(request, response) {
    con.query("SELECT * FROM Enrolment", function(err, result) {
        if (err) throw err;
        response.send(result);
    });
});

app.get("/exam", function(request, response) {
    con.query("SELECT * FROM Exam", function(err, result) {
        if (err) throw err;
        response.send(result);
    });
});

app.get("/module", function(request, response) {
    con.query("SELECT * FROM Module", function(err, result) {
        if (err) throw err;
        response.send(result);
    });
});

app.get("/student", function(request, response) {
    con.query("SELECT * FROM Student", function(err, result) {
        if (err) throw err;
        response.send(result);
    });
});

app.get("/teaching", function(request, response) {
    con.query("SELECT * FROM Teaching", function(err, result) {
        if (err) throw err;
        response.send(result);
    });
});

app.get("/transfer", function(request, response) {
    con.query("SELECT * FROM Transfer", function(err, result) {
        if (err) throw err;
        response.send(result);
    });
});

app.listen(3000, 'localhost', function() {
    console.log("Server is running...")
});