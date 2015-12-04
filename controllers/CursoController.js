User = require("../models/curso.js")

exports.Index = function(request, response){

	var codigo = request.body.codigo;
//	User.findAll(codigo, function (err, users) {
	
	User.findAll(codigo,function (err, users) {
		response.cursos = users;
		response.render('curso/Index', response);
    });

};
 
exports.Other = function(request, response){
    response.render('curso/Other');
};

exports.Search = function(request, response){
	var codigo = request.body.codigo;
	response.render('curso/Search', response);
	// User.findAll(codigo,function (err, users) {
	// 	response.cursos = users;
 //    });

}