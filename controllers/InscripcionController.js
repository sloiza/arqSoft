User = require("../models/curso.js");
var inscripcion_model = require("../models/inscripcion.js");
exports.New = function(request, response){
	
	var code = request.params.code;
	var curso = request.params.curso;
	// response.codigo = code;
	// response.curso = curso;
	User.findByCode(code,curso,function(err, rep){
		response.datos = rep.data;
		//var status = inscripcion_model.validaVacantes(code,curso);
		console.log(rep);
		//console.log(response)
		//console.log(rep);
		if(err){
			console.log(err);
		}else{
			response.render('inscripcion/New', response);	
		}
	})
};

exports.Confirm = function(request, response){
	response.padron = request.body.padron;
	response.email = request.body.email;
	response.codigo = request.body.codigo;
	response.render('inscripcion/Confirm', response);
};