Curso = require("../models/curso.js");
var inscripcion = require("../models/inscripcion.js");
exports.New = function(request, response){
	
	var code = request.params.code;
	var curso = request.params.curso;
	Curso.findByCode(code,curso,function(err, rep){
		response.datos = rep.data;
		Curso.validaVacantes(code,curso, function(err, status){
			if(status){
				response.render('inscripcion/New', response);		
			}else{
				response.render('inscripcion/Deny', response);		
			}
		});
		
	})
};

exports.Confirm = function(request, response){
	response.padron = request.body.padron;
	response.email = request.body.email;
	response.codigo = request.body.codigo;
	response.curso = request.body.curso;

	Curso.findByCode(response.codigo,response.curso,function(err, rep){
		response.datos = rep.data;
		Curso.disminuirVacante(response.codigo, response.curso, function(err, status){
			if(status){
				inscripcion.guardar(response.padron, response.email, response.curso, response.codigo, function(err, res){
					if(err){
						console.log("error guardado");
						console.log(err);
					}else{
						console.log("guardado");
						response.render('inscripcion/Confirm', response);		
					}
				})
			}else{
				response.render('inscripcion/Deny', response);		
			}
		});
			
	});
};


exports.All = function(request,response){
	response.padron = request.params.padron;
	inscripcion.findAll(response.padron, function(err, inscripciones){
		response.inscripciones = inscripciones;
		console.log("inscripciones");
		console.log(inscripciones);
		response.render('inscripcion/Inscripciones', response);
	});
}