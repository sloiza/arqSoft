User = require(process.cwd()+ "/models/login.js")

exports.Login = function(request, response){

	response.render('login/Login', response);



};
 