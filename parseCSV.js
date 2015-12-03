//Proceso qye lee el excel y guarda en redis los datos de materias y cursos
var redislib = require(process.cwd()+ '/redisLib.js');
var async     = require('async'); // asynchronous functions
var rl = require('readline').createInterface({terminal: false,
  input: require('fs').createReadStream(process.cwd() + '/datos/Horarios_2Q2015.csv')
});

Array.prototype.clear = function() {
    this.splice(0, this.length);
};

var materias = [];

  var materia  = {};
  materia.horarios = [];

rl.on('line', function (line) {
  if(line !== '' && line !== '"'){
  	console.log(' ----  Line from file: ----', line);
        //Proceso linea Materia
         if(line.indexOf("Materia:") != -1){
         	 console.log("||| Parseo materia |||");
	        //Guardo en redis el objeto
	        console.log("guardo mat");
	        console.log(JSON.stringify(materia));
	        if(materia != undefined){
				materias.push(materia);
	        }
	        materia  = {};
  			materia.horarios = [];
	        //materia.horarios.clear();
	        console.log(" //////// MATERIAS: //////////");
	        console.log(JSON.stringify(materias));
        
            var mat = line.split(':', 3)[1];
            var mat_dat = mat.split('-');
            console.log("MAT");
            console.log(mat);
            materia.codigo = (mat_dat[0] != undefined) ? (mat_dat[0]).trim() : '0';
            materia.nombre = ((mat_dat[1]) != undefined) ? (mat_dat[1]).trim() : '0';
            materia.vacantes = line.split('acantes:')[1].trim();
	      }else if(line.indexOf("Docente:") != -1){
	      	console.log("||| Parseo docente |||");
	        var doc = line.split(':', 2)[1];
	        materia.docente = doc.trim();
	      }else if(line.indexOf("Carreras:") != -1){
	      	console.log("||| Parseo carreras |||");
	        var carreras = line.split(':', 2)[1];
	        materia.carreras = carreras.trim();
	      }else if(line.indexOf("Curso:") != -1){
	      	console.log("||| Parseo curso |||");
	        var curso = line.split(':', 2)[1];
	        materia.curso = curso.trim();
	      }else if(line.indexOf("Aula:") != -1){
	      	console.log("||| Parseo horarios |||");
	        materia.horarios.push(line.trim());

	      }



	}    
}).on('close', function(){
	console.log("END FILE");
	console.log("PROCESS TO REDIS");
	console.log(JSON.stringify(materias));
	async.eachSeries(materias, function(materia, next){
		console.log(materia);
		//var materia = JSON.parse(mat);

		 redislib.insertRedis(materia.curso, materia.codigo, JSON.stringify(materia), function(err, response){
            console.log("Insert in redis");
            console.log(JSON.stringify(materia));
            if(err){
              next(err);
              console.log(err);
            }else{
              console.log("response redis");
              console.log(response);
              next(null);
              // console.log("before clear horarios");
              // console.log(materia.horarios);
              // materia.horarios.clear();
              // console.log("after clear horarios");
              
            }
          });

	}, function(err){
		process.exit(0);
	});
});
