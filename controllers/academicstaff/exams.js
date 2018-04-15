/*
CONTROLLER - EXAM MANAGEMENT
*/
var express = require('express')
    ,router = express.Router()
    ,Module = require('../../models/module')
    ,Exam = require('../../models/exam');

/*
Route to display a form for adding exam paper
*/
router.get('/academicstaff/exams/add', function(req, res) {
    username = req.session.user;
    Module.getModulesTaughtByUsername(username, function(modulesTaught) {
        res.render('academicstaff_exams_add', {
            modules: modulesTaught
        });
    });

});


/*
Route for add exam post request
*/
router.post('/academicstaff/exams/upload', function(req, res) {
    var examFile = req.files.ExamFile;

    var today = new Date();
    var fileName = req.body['ModuleCode'] +'('+today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+')'+'.pdf';

    //Use the mv() method to place the file on the server
    examFile.mv(process.cwd() + '/Exams/' + fileName, function(err) {
        if (err) {
            console.log(err);
        } else {
        	//If file successfuly uploaded to server - add Exam to the database
        	exam = [[
        		req.body['ModuleCode'],
                Number(req.body['Weighting']),
        		Number(req.body['MaxMark']),
                fileName
        	]];
        	Exam.addExam(exam,function(){
                console.log("Database updated!");
        	});
        }
    });
    res.redirect('/academicstaff/exams/add');
});

module.exports = router;