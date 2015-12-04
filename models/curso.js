var redislib = require(process.cwd()+ '/libs/redisLib.js');
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

Curso.validaVacantes = function (codigo, curso, callback){
	redislib.getRedis(curso, codigo, function(err, json){
		var curso = JSON.parse(json);
		if(curso.vacantes > 0){
			console.log("HAY VACANTES: "+curso.vacantes);
			callback(null, true);
		}else{
			console.log("NO HAY: "+curso.vacantes);
			callback(null, false);
		}
		
	});
}

Curso.disminuirVacante = function(codigo, cur, callback){
	redislib.getRedis(cur, codigo, function(err, json){
		var curso = new Curso(JSON.parse(json));
		curso = curso.data;
		console.log(curso);
		curso.vacantes--;
		console.log(curso.vacantes);
		redislib.insertRedis(cur, codigo, JSON.stringify(curso), function(err, res){
			if(err){
				console.log(err);
				callback(err);
			}else{
				console.log("insertRedis:"+res);
				callback(null, true);
				
			}
		})
		
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