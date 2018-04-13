
/*
CONTROLLER 
*/
var express = require('express')
    ,router = express.Router()
    ,Coursework = require('../../models/coursework')
    ,Module = require('../../models/module');


router.get('/academicstaff/coursework', function(req, res) {
    username = req.session.user;
    Module.getModulesTaughtByUsername(username, function(modulesTaught) {
        res.render("academicstaff_coursework", {
            modules: modulesTaught
        });
    });

});

router.post('/academicstaff/uploadCwk', function(req, res) {
    var cwk = req.files.CwkFile;

    if (cwk.mimetype != 'application/pdf') {
        //TODO: if type doesnt macth
    }

    //Use the mv() method to place the file on the server
    var fileName = req.body['module'] + '_' + req.body['cwkNumber'] + '.pdf';
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
        		req.body['Notes']
        	]];
        	Coursework.addCoursework(coursework,function(){
                console.log("Database updated!");
        	});
            console.log("Uploaded!");
        }
    });
    res.redirect('/academicstaff/coursework');
});

module.exports = router;