/*
MIDDLEWARE
*/

//If user is logged in proceed with the request
module.exports = function(req,res,next){

	if ((req.path == "/") || (req.path == "/login")){
		next()
	}
	else{
		if (req.session.user){
			next();
		}
		else{
			//Error code 401: Unauthorized
			res.redirect('/');
		}
	}
}