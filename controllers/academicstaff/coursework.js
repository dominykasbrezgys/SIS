
/*
CONTROLLER - COURSEWORK MANAGEMENT
*/
var express = require('express')
    ,router = express.Router()
    ,Coursework = require('../../models/coursework')
    ,Assessing = require('../../models/assessing')
    ,Teaching = require('../../models/teaching')
    ,Module = require('../../models/module')
    ,Enrolment = require('../../models/enrolment');

/*
Route to display a form for adding a coursework
*/
router.get('/academicstaff/coursework/add', function(req, res) {
    username = req.session.user;

    Module.getModulesTaughtByUsername(username, function(modulesTaught) {
        res.render('academicstaff_coursework_add', {
            modules: modulesTaught
        });
    });
});

/*
Route for add coursework post request
*/
router.post('/academicstaff/coursework/uploadcwk', function(req, res) {
    var cwk = req.files.CwkFile;
    var today = new Date();
    //This flag is needed because node.js continues code execution after the page is redirected
    var hasBeenRedirected = false;
    var setDate = req.body['SetDate'].split("/");
    var dueDate = req.body['DueDate'].split("/");
    var returnDate = req.body['ReturnDate'].split("/");
    var fileName = req.body['ModuleCode'] + '_' + req.body['CwkNumber'] +'('+today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+')'+'.pdf';

    //Check for deadline clashes
    Coursework.getCurrentDeadlines(today.getFullYear(),function(deadlines){
        deadlines.forEach(function(deadline){
            if ( dueDate[2] == deadline['DueDate'].getFullYear() && 
                dueDate[1] == deadline['DueDate'].getMonth()+1 &&
                dueDate[0] == deadline['DueDate'].getDate()){
                dateToRedirect = deadline['DueDate'].getDate()+' - '+(deadline['DueDate'].getMonth()+1)+' - '+deadline['DueDate'].getFullYear();
                if (!hasBeenRedirected){
                    res.redirect('/academicstaff/coursework/invalidDeadline/'+dateToRedirect);
                    hasBeenRedirected = true;
                }
            } else if (deadline == deadlines[deadlines.length-1]){
                //If no clashing deadlines found:
                //Use the mv() method to place the file in the server_files folder
                cwk.mv(process.cwd() + '/server_files/Coursework/' + fileName, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        //If file successfuly uploaded to server - add Coursework to the database
                        coursework = [[
                            req.body['ModuleCode'],
                            Number(req.body['CwkNumber']),
                            setDate[2]+"-"+setDate[1]+"-"+setDate[0],
                            dueDate[2]+"-"+dueDate[1]+"-"+dueDate[0],
                            returnDate[2]+"-"+returnDate[1]+"-"+returnDate[0],
                            Number(req.body['CwkWeighting']),
                            Number(req.body['MaxMark']),
                            req.body['Notes'],
                            fileName
                        ]];
                        Coursework.addCoursework(coursework,function(){
                            console.log("Database updated!");
                            res.redirect('/academicstaff/coursework/successfullyAdded');
                        });
                        console.log("Coursework uploaded!");
                    }
                });
            }
        });
    });
});

/*
Route for invalid deadline entered
*/
router.get('/academicstaff/coursework/invalidDeadline/:date', function(req,res){
    res.render("academicstaff_coursework_invalid_deadline",{dueDate: req.params['date']});
});

/*
Route for successfully added coursework
*/
router.get('/academicstaff/coursework/successfullyAdded', function(req,res){
    res.render("academicstaff_coursework_successfully_added");
});

/*
Route for a user to display all coursework assessed and download a 
corresponding Coursework file
*/
router.get('/academicstaff/coursework/assess', function(req,res){
    username = req.session.user;
    //This array is used to compose data for page rendering
    data = [];

    //Get all modules assessed by the user
    Assessing.getModulesAssessedBy(username,function(modules){

        //If no modules are assessed by this user - render a page
        if (modules.length == 0){
            res.render('academicstaff_coursework_assess');
            return;
        }

        //If there are modules that user assesses - iterate over all of them
        modules.forEach(function(module){
            //Retrieve coursework information of each module
            Coursework.getCourseworkOf(module['ModuleCode'],function(coursework){

                //If there are no coursework at the last module and no data
                //gathered from previous modules - render a page
                if(coursework.length == 0 &&
                    module == modules[modules.length-1] &&
                    data.length == 0){
                    res.render('academicstaff_coursework_assess');
                    return;
                }

                coursework.forEach(function(cwk){
                    data.push({
                        ID : cwk['id'],
                        ModuleCode : module['ModuleCode'],
                        CourseworkNumber : cwk['CourseworkNumber'],
                        FileName : cwk['FileName'],
                        IsApproved : cwk['IsApproved']
                    });
                    //Render page when data is complete (reached the end of checking all modules and all coursework)
                    if(module == modules[modules.length-1] &&
                        cwk == coursework[coursework.length-1]){
                        res.render('academicstaff_coursework_assess',{data:data});
                    }
                });
            });
        });
    });
});

/*
Route for downloading a coursework file
*/
router.get('/academicstaff/coursework/download/:filename', function(req,res){
    var file = process.cwd() + '/server_files/Coursework/'+req.params['filename'];
    res.download(file);
});

/*
Route for approving the coursework (redirects to /academicstaff/coursework/assess)
*/
router.get('/academicstaff/coursework/approve/:idInDatabase', function(req,res){
    Coursework.approveCourseworkById(req.params['idInDatabase'], function(){
        res.redirect('/academicstaff/coursework/assess');;
    });
});

/*
Route for disapproving the coursework (redirects to /academicstaff/coursework/assess)
*/
router.get('/academicstaff/coursework/disapprove/:idInDatabase', function(req,res){
    Coursework.disapproveCourseworkById(req.params['idInDatabase'], function(){
        res.redirect('/academicstaff/coursework/assess');;
    });
});

/*
Route that is used for chosing which coursework to mark
*/
router.get('/academicstaff/coursework/mark', function(req,res){
    username = req.session.user;
    //Arrays represents data needed for page rendering
    cwkNumbers = [];
    moduleCodes = [];

    //Get all modules taught by the user
    Teaching.getModulesTaughtBy(username,function(modules){

        //If no modules taught - there will be no coursework to mark, hence render the page
        if(modules.length == 0){
            res.render('academicstaff_coursework_mark_choose')
        }
        modules.forEach(function(module){
            //Retrieve coursework of each module
            Coursework.getCourseworkOf(module['ModuleCode'],function(coursework){

                //If there are no coursework at the last module and no data
                //gathered from previous modules - render a page
                if(coursework.length == 0 &&
                    module == modules[modules.length-1] &&
                    cwkNumbers.length == 0){
                    res.render('academicstaff_coursework_mark_choose');
                    return;
                }

                //If there are no coursework at the last module but some data
                //gathered from previous modules - render a page passing that data
                if(coursework.length == 0 && 
                    module == modules[modules.length-1] &&
                    cwkNumbers.length > 0 ){
                    res.render('academicstaff_coursework_mark_choose',{cwkNumbers:cwkNumbers, moduleCodes:moduleCodes});
                    return;
                }

                coursework.forEach(function(cwk){
                    cwkNumbers.push({CourseworkNumber: cwk['CourseworkNumber']});

                    //If the end of coursework array reached - add module code for page rendering
                    if(cwk == coursework[coursework.length-1]){
                        moduleCodes.push({ModuleCode: cwk['ModuleCode']})
                    }
                    
                    //Render page when data is complete (reached the end of checking all modules and all coursework)
                    if(module == modules[modules.length-1] &&
                        cwk == coursework[coursework.length-1]){
                        res.render('academicstaff_coursework_mark_choose',{cwkNumbers:cwkNumbers, moduleCodes:moduleCodes});
                        return;
                    }
                });
            });

        });
    });
});

/*
Route for marking chosen coursework
*/
router.get('/academicstaff/coursework/mark/:ModuleCode/:CourseworkNumber', function(req,res){
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
        //Get information needed for page rendering (CourseworkID in the database and Max mark of that coursework)
        Coursework.getCwkIdAndMaxMark(req.params['ModuleCode'],req.params['CourseworkNumber'], function(cwkInfo){
            //Check if any student has already been marked
            studentsEnrolled.forEach(function(student){
                Coursework.isStudentMarked(student['id'], cwkInfo['id'],function(result){
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
                        res.render('academicstaff_coursework_mark',{data:data,
                                cwkInfo : cwkInfo }); 
                    }
                })
            });
        });
    });
});

/*
Route for post request when user chooses which coursework to mark
*/
router.post('/academicstaff/coursework/mark/choosecoursework', function(req,res){
    res.redirect('/academicstaff/coursework/mark/'+req.body['ModuleCode']+'/'+req.body['CourseworkNumber'])
});

/*
Route for submitting a mark to database
*/
router.post('/academicstaff/coursework/mark/submit/:StudentID/:CourseworkID',function(req,res){
    //Add mark to the database if it's not empty
    Coursework.addMark(req.params['CourseworkID'], req.params['StudentID'], req.body['RawMark'],function(){
        Coursework.getCourseworkModuleCodeAndNumber(req.params['CourseworkID'], function(ModuleCode, CourseworkNumber){
            res.redirect("/academicstaff/coursework/mark/"+ModuleCode+"/"+CourseworkNumber);
        });
    });
})

/*
Route for removing a mark from database
*/
router.get('/academicstaff/coursework/mark/remove/:StudentID/:CourseworkID',function(req,res){

    //Remove mark from the database
    Coursework.removeMark(req.params['CourseworkID'], req.params['StudentID'],function(){
        Coursework.getCourseworkModuleCodeAndNumber(req.params['CourseworkID'], function(ModuleCode, CourseworkNumber){
            res.redirect("/academicstaff/coursework/mark/"+ModuleCode+"/"+CourseworkNumber);
        })
    })
})


module.exports = router;