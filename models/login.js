var async   	= require('async');
var redislib = require(process.cwd()+ '/libs/redisLib.js');
var cursoC = require(process.cwd()+ "/models/curso.js")

var Login = function (data) {  
    this.data = data;
}

Login.prototype.data = {}

Login.guardar = function (padron, email, callback){
	redislib.getRedis(email, padron, function(err, json){
		if(err){
			console.log("error");
		}else{
			console.log(json);
			//SI usuario no existe lo inserta, sino no hace nada
			if(json == undefined){
				var user = {padron: padron, email:email};
				redislib.insertRedis(padron, email, JSON.stringify(user) , function(err, res){
					if(err){
						console.log(err);
						callback(err);
					}else{
						console.log("insertRedis:"+res);
						callback(null, true);
						
					}
				});
			}else{
				console.log("Usuario ya existe");
				callback(null, true);
			}
			
		}
		
	});
}

module.exports = Login;