
/*
CONTROLLER 
*/
var express = require('express')
    ,router = express.Router()
    ,Coursework = require('../../models/coursework')
    ,Assessing = require('../../models/assessing')
    ,Module = require('../../models/module');

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
router.post('/academicstaff/uploadcwk', function(req, res) {
    var cwk = req.files.CwkFile;

    var today = new Date();
    var fileName = req.body['ModuleCode'] + '_' + req.body['CwkNumber'] +'('+today.getFullYear()+'-'+today.getMonth()+'-'+(today.getDate()+1)+')'+'.pdf';

    //Use the mv() method to place the file on the server
    cwk.mv(process.cwd() + '/Courseworks/' + fileName, function(err) {
        if (err) {
            console.log(err);
        } else {
        	//If file successfuly uploaded to server - add Coursework to the database
            setDate = req.body['SetDate'].split("/");
            dueDate = req.body['DueDate'].split("/");
            returnDate = req.body['ReturnDate'].split("/");
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
        	});
            console.log("Coursework uploaded!");
        }
    });
    res.redirect('/academicstaff/coursework/add');
});

/*
Route for a user to display all modules assessed and download a 
corresponding Coursework file to download
*/
router.get('/academicstaff/coursework/assess', function(req,res){
    username = req.session.user;
    //This array is used to compose date for page rendering
    data = [];

    //Get all modules assessed by the user
    Assessing.getModulesAssessedBy(username,function(modules){
        modules.forEach(function(module){
            //Retrieve coursework file names of each module
            Coursework.getCourseworkOf(module['ModuleCode'],function(coursework){
                coursework.forEach(function(cwk){
                    data.push({
                        ID : cwk['id'],
                        ModuleCode : module['ModuleCode'],
                        CourseworkNumber : cwk['CourseworkNumber'],
                        FileName : cwk['FileName'],
                        IsApproved : cwk['IsApproved']
                    });
                    //Render page when data is complete
                    if(data.length == (modules.length*coursework.length)){
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
    var file = process.cwd() + '/Courseworks/'+req.params['filename'];
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

module.exports = router;