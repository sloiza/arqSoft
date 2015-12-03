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

Curso.findAll = function (callback) {  
    //var curso1 = new Curso({name: "Arquitectura de Software", code: "1111"});
    //var curso2 = new Curso({name: "Sistemas Gráficos", code: "2222"});
    var cursos = [];
    redislib.getByPrefix('7801', function(error, response){
		if(error){
			console.log(error);
			callback(error);
		}
		else{
			console.log("OK");
			console.log(response);
			async.eachSeries(response, function(value, next){
				var curso = new Curso(value);
				cursos.push(curso);
				next(null);	
	        }, function(err){ // series - end
				callback(null, cursos);
	        });
		}
	});    
}

module.exports = Curso;