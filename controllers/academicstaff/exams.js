/*
CONTROLLER - EXAM MANAGEMENT
*/
var express = require('express')
    ,router = express.Router()
    ,Module = require('../../models/module')
    ,Assessing = require('../../models/assessing')
    ,Teaching = require('../../models/teaching')
    ,Enrolment = require('../../models/enrolment')
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

/*
Route for a user to display all exams assessed and download a 
corresponding Coursework file
*/
router.get('/academicstaff/exams/assess', function(req,res){
    username = req.session.user;
    //This array is used to compose data for page rendering
    data = [];

    //Get all modules assessed by the user
    Assessing.getModulesAssessedBy(username,function(modules){

        //If no modules are assessed by this user - render a page
        if (modules.length == 0){
            res.render('academicstaff_exams_assess');
            return;
        }

        //If there are modules that user assesses - iterate over all of them
        modules.forEach(function(module){
            //Retrieve exam information of each module
            Exam.getExamOf(module['ModuleCode'],function(exam){

            	if(exam){
	            	data.push({
	            		ID : exam['id'],
	            		ModuleCode : module['ModuleCode'],
	            		FileName : exam['FileName'],
	            		IsApproved : exam['IsApproved']
	            	});
            	}

            	if(module == modules[modules.length-1]){
            		res.render('academicstaff_exams_assess',{data:data});
            	}

                // coursework.forEach(function(cwk){
                //     data.push({
                //         ID : cwk['id'],
                //         ModuleCode : module['ModuleCode'],
                //         CourseworkNumber : cwk['CourseworkNumber'],
                //         FileName : cwk['FileName'],
                //         IsApproved : cwk['IsApproved']
                //     });
                //     //Render page when data is complete (reached the end of checking all modules and all coursework)
                //     if(module == modules[modules.length-1] &&
                //         cwk == coursework[coursework.length-1]){
                //         res.render('academicstaff_coursework_assess',{data:data});
                //     }
                // });
            });
        });
    });
});

/*
Route for downloading an exam file
*/
router.get('/academicstaff/exams/download/:filename', function(req,res){
    var file = process.cwd() + '/Exams/'+req.params['filename'];
    res.download(file);
});

/*
Route for approving the exam (redirects to /academicstaff/exams/assess)
*/
router.get('/academicstaff/exams/approve/:idInDatabase', function(req,res){
    Exam.approveExamById(req.params['idInDatabase'], function(){
        res.redirect('/academicstaff/exams/assess');;
    });
});

/*
Route for disapproving the exam (redirects to /academicstaff/exams/assess)
*/
router.get('/academicstaff/exams/disapprove/:idInDatabase', function(req,res){
    Exam.disapproveExamById(req.params['idInDatabase'], function(){
        res.redirect('/academicstaff/exams/assess');;
    });
});

/*
Route that is used for chosing which exam to mark
*/
router.get('/academicstaff/exams/mark', function(req,res){
    username = req.session.user;
    //Arrays represents data needed for page rendering
    moduleCodes = [];

    //Get all modules taught by the user
    Teaching.getModulesTaughtBy(username,function(modules){

        //If no modules taught - there will be no coursework to mark, hence render the page
        if(modules.length == 0){
            res.render('academicstaff_exams_mark_choose')
        }
        modules.forEach(function(module){
            //Retrieve coursework of each module

            Exam.getExamOf(module['ModuleCode'],function(exam){
            	moduleCodes.push({ModuleCode:exam['ModuleCode']});

	            if(module == modules[modules.length-1]){
	            	res.render('academicstaff_exams_mark_choose',{moduleCodes:moduleCodes})
	            }
            });
        });
    });
});

/*
Route for post request when user chooses which exam to mark
*/
router.post('/academicstaff/exams/mark/chooseexam', function(req,res){
    res.redirect('/academicstaff/exams/mark/'+req.body['ModuleCode'])
});

// /*
// Route for marking chosen exam
// */
router.get('/academicstaff/exams/mark/:ModuleCode', function(req,res){
    //Get current year of study
    var today = new Date();
    var month = today.getMonth()+1;
    var yearOfStudy = today.getFullYear();
    //If current month is from January to August, subtract one
    if( 1<= month < 9){
        yearOfStudy-=1;
    }

    //Array for composing data needed for page rendering
    var data = [];

    //Get all students that are currently enrolled on the module
    Enrolment.getCurrentEnrollments(req.params['ModuleCode'],yearOfStudy, function(studentsEnrolled){
        //Get information needed for page rendering (ExamID in the database and Max mark of that coursework)
        Exam.getExamIdAndMaxMark(req.params['ModuleCode'], function(examInfo){
            //Check if any student has already been marked
            studentsEnrolled.forEach(function(student){

                Exam.isStudentMarked(student['id'], examInfo['id'],function(result){
                    if(result){
                        data.push({
                            studentID : student['id'],
                            isMarked : true,
                            rawMark : result['RawMark']
                        });
                    }else{
                        data.push({
                            studentID : student['id'],
                            isMarked : false,
                        });
                    }

                    if(student == studentsEnrolled[studentsEnrolled.length-1]){
                        res.render('academicstaff_exams_mark',{data:data,
                                examInfo : examInfo }); 
                    }
                })
            });

        });
    });
});

/*
Route for submitting a mark to database
*/
router.post('/academicstaff/exams/mark/submit/:StudentID/:ExamID',function(req,res){
    //Add mark to the database if it's not empty
    Exam.addMark(req.params['ExamID'], req.params['StudentID'], req.body['RawMark'],function(){
        Exam.getExamById(req.params['ExamID'], function(ModuleCode){
            res.redirect("/academicstaff/exams/mark/"+ModuleCode);
        });
    });
})

/*
Route for removing a mark from database
*/
router.get('/academicstaff/exams/mark/remove/:StudentID/:ExamID',function(req,res){

    //Remove mark from the database
    Exam.removeMark(req.params['ExamID'], req.params['StudentID'],function(){
        Exam.getExamById(req.params['ExamID'], function(ModuleCode){
            res.redirect("/academicstaff/exams/mark/"+ModuleCode);
        })
    })
})

module.exports = router;