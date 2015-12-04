var async   	= require('async');
var redislib = require(process.cwd()+ '/libs/redisLib.js');
var cursoC = require("../models/curso.js")

var Inscripciones = function (data) {  
    this.data = data;
}

Inscripciones.prototype.data = {}


Inscripciones.guardar = function (padron, email, cur, codigo, callback){
	redislib.getRedis(cur, codigo, function(err, json){
		if(err){
			console.log("error");
		}else{
			var curso = JSON.parse(json);;
			redislib.insertRedis(codigo, padron, JSON.stringify(curso), function(err, res){
				if(err){
					console.log(err);
					callback(err);
				}else{
					console.log("insertRedis:"+res);
					callback(null, true);
					
				}
			})
			
		}
		
	});
}

Inscripciones.findAll = function(padron, callback){
	var inscripciones = [];
  	redislib.getByPrefix(padron, function(error, response){
		if(error){
			console.log(error);
		}
		else{
			console.log("OK");
//			console.log(response);
			async.eachSeries(response, function(value, next){
				var padron = value.split('_')[0];
				var codigo = value.split('_')[1];
				redislib.getRedis(codigo, padron, function(err, json){
					curso = new Curso(JSON.parse(json));
					inscripciones.push(curso);
					next(null);
						
				});
			}, function(err){ // series - end
				// console.log("cursos");
				// console.log(cursos);
				callback(null, inscripciones);
	        });
	}
	});
}



module.exports = Inscripciones;