User = require("../models/curso.js")

exports.Index = function(request, response){

	User.findAll(codigo, function (err, users) {
		response.cursos = users;
		response.render('curso/Index', response);
    });
};
 
exports.Other = function(request, response){
    response.render('curso/Other');
};