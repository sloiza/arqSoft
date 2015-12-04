Curso = require(process.cwd()+ "/models/curso.js");
var inscripcion = require(process.cwd()+ "/models/inscripcion.js");
exports.New = function(request, response){
	console.log("Request New inscripciones body");
	console.log(request.body);
	console.log("Request New inscripciones query");
	console.log(request.query);
	console.log("Request New inscripciones params");
	console.log(request.params);
	response.codigo = request.body.code;
	response.curso = request.body.curso;
	response.padron = request.body.padron;
	response.email = request.body.email;
	console.log("-----------");
	Curso.findByCode(response.codigo,response.curso,function(err, rep){
		response.datos = rep.data;
		inscripcion.inscriptoMateria(response.padron, response.codigo, function(err, status){
			if(status){
				console.log("ya inscripto");
				response.render('inscripcion/Inscripto', response);	
			}else{
				Curso.validaVacantes(response.codigo,response.curso, function(err, status){
					if(status){
						response.render('inscripcion/New', response);		
					}else{
						response.render('inscripcion/Deny', response);		
					}
				});
				
			}
		})
		
	})
};

exports.Confirm = function(request, response){
	console.log("Request Confirm body");
	console.log(request.body);
	console.log("Request Confirm query");
	console.log(request.query);
	console.log("Request Confirm params");
	console.log(request.params);
	response.padron = request.body.padron;
	response.email = request.body.email;
	response.codigo = request.body.codigo;
	response.curso = request.body.curso;
	var p = request.body.padron_1;

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
	console.log("Inscripciones body");
	console.log(request.body);
	console.log("Inscripciones  query");
	console.log(request.query);
	console.log("Inscripciones params");
	console.log(request.params);
	response.padron = request.params.padron;
	inscripcion.findAll(response.padron, function(err, inscripciones){
		response.inscripciones = inscripciones;
		console.log("inscripciones");
		console.log(inscripciones);
		response.render('inscripcion/Inscripciones', response);
	});
}