/*
MIDDLEWARE that is executed before every request
*/


/*
If user is logged in proceed with the request
*/
module.exports = function(req,res,next){

	if ((req.path == "/") || 
		(req.path == "/login") ||
		(req.path == "/logout")){
		next()
	}
	else{
		if (req.session.user){
			//Disallow students to access academicstaff routes and vice versa
			if (req.session.type == 'academicstaff' && 
				req.path.includes('/academicstaff/')){
				next();
			}else if (req.session.type == 'student' && 
				req.path.includes('/student/')){
				next();
			}else{
				res.redirect('/');
			}
		}
		else{
			//User not logged in- redirect to log in page
			res.redirect('/');
		}
	}
}