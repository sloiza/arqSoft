User = require("../models/curso.js")

exports.Index = function(request, response){

	User.findAll(function (err, users) {
		response.curso1 = users[0].data.name;
		response.codigo1 = users[0].data.code;
		response.curso2 = users[1].data.name;
		response.codigo2 = users[1].data.code;
		response.cursos = users;
    });
	response.render('curso/Index', response);
};
 
exports.Other = function(request, response){
    response.render('curso/Other');
};