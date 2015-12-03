exports.New = function(request, response){
	
	var code = request.params.code;
	response.codigo = code;
	response.render('inscripcion/New', response);
};

exports.Confirm = function(request, response){
	response.padron = request.body.padron;
	response.email = request.body.email;
	response.codigo = request.body.codigo;
	response.render('inscripcion/Confirm', response);
};