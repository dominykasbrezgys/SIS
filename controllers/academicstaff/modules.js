/*
CONTROLLER 
*/
var express = require('express')
    ,router = express.Router()
    ,Module = require('../../models/module');


router.get('/academicstaff/allmodules', function(req, res) {
	username = req.session.user;
	rows = []

	//Get all modules
	Module.getAll(function(modules){
		//Retrieve teaching/assessing information associated with each module
		modules.forEach(function(module){
			Module.getTeachingStaff(module['ModuleCode'], function(teaching){
				Module.getAssessingStaff(module['ModuleCode'], function(assessing){
					//Build array for page rendering
					rows.push({
						ModuleCode : module['ModuleCode'],
						ModuleName : module['ModuleName'],
						Credits : module['NumberOfCredits'],
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

router.get('/academicstaff/assessedmodules', function(req, res) {
	username = req.session.user;
	rows = [];

	//Get modules that are assessed by the academic staff member
	Module.getModulesAssessedByUsername(username, function(modulesAssessed){
		res.render("academicstaff_assessed_modules",{modulesAssessed:modulesAssessed})
	});
});

router.get('/academicstaff/taughtmodules', function(req, res) {
	username = req.session.user;
	rows = [];

	//Get modules that are taught by the academic staff member
	Module.getModulesTaughtByUsername(username, function(modulesTaught){
		res.render("academicstaff_taught_modules", {modulesTaught:modulesTaught})
	});
});

module.exports = router;