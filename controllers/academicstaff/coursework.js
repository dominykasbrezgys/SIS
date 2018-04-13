
/*
CONTROLLER 
*/
var express = require('express')
    ,router = express.Router()
    ,Coursework = require('../../models/coursework')
    ,Module = require('../../models/module');


router.get('/academicstaff/coursework/add', function(req, res) {
    username = req.session.user;
    Module.getModulesTaughtByUsername(username, function(modulesTaught) {
        res.render("academicstaff_coursework", {
            modules: modulesTaught
        });
    });

});

router.post('/academicstaff/uploadCwk', function(req, res) {
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
            console.log("Uploaded!");
        }
    });
    res.redirect('/academicstaff/coursework/add');
});

module.exports = router;