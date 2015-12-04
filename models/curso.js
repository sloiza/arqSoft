var redislib = require(process.cwd()+ '/redisLib.js');
var async   	= require('async');

var Curso = function (data) {  
    this.data = data;
}

Curso.prototype.data = {}

Curso.prototype.changeName = function (name) {  
    this.data.name = name;
}

Curso.prototype.get = function (name) {  
    return this.data[name];
}

Curso.prototype.set = function (name, value) {  
    this.data[name] = value;
}

Curso.findByCode = function (codigo, curso, callback){
	redislib.getRedis(curso, codigo, function(err, json){
		var curso = new Curso(JSON.parse(json));
		callback(null, curso);
		
	});
}

Curso.findAll = function (codigo, callback) {  
  	var cursos = [];
  	redislib.getByPrefix(codigo, function(error, response){
		if(error){
			console.log(error);
		}
		else{
			console.log("OK");
//			console.log(response);
			async.eachSeries(response, function(value, next){
				var prefix = value.split('_')[0];
				var curso = value.split('_')[1];
				redislib.getRedis(curso, prefix, function(err, json){
					// console.log("--- value -----");
					// console.log(JSON.parse(json));
					//var json = JSON.parse(json);
					//json.horarios = JSON.stringify(json.horarios);
					//console.log(json);
					var curso = new Curso(JSON.parse(json));
					cursos.push(curso);
					next(null);
					
				});
			}, function(err){ // series - end
				// console.log("cursos");
				// console.log(cursos);
				callback(null, cursos);
	        });
		}
	});
}

module.exports = Curso;