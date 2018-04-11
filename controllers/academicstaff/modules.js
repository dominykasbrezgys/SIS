/*
CONTROLLER 
*/
var express = require('express')
    ,router = express.Router()
    ,AcademicStaff = require('../../models/academicstaff')
    ,Module = require('../../models/module')
    ,Student = require('../../models/student');


router.get('/academicstaff/allmodules', function(req, res) {
	username = req.session.user;
	rows = []

	//Get all modules
	Module.getAll(function(modules){
		//Retrieve teaching/assessing information associated with each module
		modules.forEach(function(module){
			Module.getTeachingStaff(module['ModuleCode'], function(teaching){
				Module.getAssessingStaff(module['ModuleCode'], function(assessing){
					rows.push({
						ModuleCode : module['ModuleCode'],
						ModuleName : module['ModuleName'],
						TeachingStaff : teaching,
						AssessingStaff : assessing
					});
					if (rows.length == modules.length){
						res.render("academicstaff_all_modules",{rows:rows})
					}
				});
			});
		});
	});
});

module.exports = router;