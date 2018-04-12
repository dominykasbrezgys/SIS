/*
CONTROLLER 
*/
var express = require('express')
    ,router = express.Router()
    ,AcademicStaff = require('../../models/academicstaff')
    ,Module = require('../../models/module')
    ,Student = require('../../models/student');


router.get('/academicstaff/coursework', function(req, res) {
	username = req.session.user;
	Module.getModulesTaughtByUsername(username, function(modulesTaught){
		res.render("academicstaff_coursework",{modules:modulesTaught});
	});

	
});

router.post('/academicstaff/uploadCwk', function(req, res) {

   var cwk = req.files.cwk;

   console.log(req.body['module']);
   console.log(req.body['cwkNumber']);
   console.log(req.body['cwkWeighting']);
   console.log(req.body['maxMark']);

   if (cwk.mimetype != 'application/pdf'){
   	//TODO: if type doesnt macth
   }

   // Use the mv() method to place the file on the server
   var fileName = req.body['module']+'_'+req.body['cwkNumber']+'.pdf';
   cwk.mv(process.cwd()+'/Courseworks/' + fileName, function(err) {
     if(err){
       console.log(err);
     }else{
    console.log("Uploaded!");
}
   });


   res.redirect('/academicstaff/coursework');
 });

module.exports = router;