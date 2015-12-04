Curso = require(process.cwd()+ "/models/curso.js");
Login = require(process.cwd()+ "/models/login.js");

exports.Index = function(request, response){
	console.log("-------------");
	console.log("Request Index: body");
	console.log(request.body);
	console.log("Request Index: query");
	console.log(request.query);
	console.log("Request Index: params");
	console.log(request.params);
	console.log("-------------");
	response.padron = request.body.padron;
	//exports.padron = response.padron;
	response.email = request.body.email;
	response.codigo = request.body.codigo;
	
	Curso.findAll(response.codigo,function (err, users) {
		response.cursos = users;
		// console.log(response.cursos);
		 console.log("--------------");
		response.render('curso/Index', response);
    });

};


 
exports.Other = function(request, response){
    response.render('curso/Other');
};

exports.Search = function(request, response){
	//guardar usuario en la db?
	console.log("-------------");
	console.log("Request search: body");
	console.log(request.body);
	console.log("Request search: query");
	console.log(request.query);
	console.log("Request search: params");
	console.log(request.params);
	console.log("-------------");
	response.padron = request.query.padron;
	response.email = request.query.email;
	response.render('curso/Search', response);
	// Login.guardar(response.padron, response.email, function(err, status){
	// 	if(status){
	// 		response.render('curso/Search', response);
	// 	}else{
	// 		console.log("fallo guardar profile");
	// 		response.render('curso/Search', response);
	// 	}
	// })

}