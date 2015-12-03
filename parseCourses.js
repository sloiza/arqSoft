//Proceso qye lee el excel y guarda en redis los datos de materias y cursos
var redislib = require(process.cwd()+ '/redisLib.js');
var async     = require('async'); // asynchronous functions
var rl = require('readline').createInterface({
  input: require('fs').createReadStream(process.cwd() + '/datos/Horarios_2Q2015.csv')
});

Array.prototype.clear = function() {
    this.splice(0, this.length);
};

function parseCSV(line, materia){
  async.waterfall([ // waterfall - begin
      function parseMat (callback){
        //Proceso linea Materia

        if(line.indexOf("Materia:") != -1){
          console.log("||| Parseo materia |||");
          //Guardo en redis el objeto
          redislib.insertRedis(materia.curso, materia.codigo, JSON.stringify(materia), function(err, response){
            console.log("Insert in redis");
            console.log(JSON.stringify(materia));
            if(err){
              callback(err);
              console.log(err);
            }else{
              console.log("response redis");
              console.log(response);
              // console.log("before clear horarios");
              // console.log(materia.horarios);
              // materia.horarios.clear();
              // console.log("after clear horarios");
              console.log(materia.horarios);
              var mat = line.split(':', 3)[1];
              var mat_dat = mat.split('-');
              console.log("MAT");
              console.log(mat);
              materia.codigo = (mat_dat[0] != undefined) ? (mat_dat[0]).trim() : '0';
              materia.nombre = ((mat_dat[1]) != undefined) ? (mat_dat[1]).trim() : '0';
              materia.vacantes = (mat_dat[3] != undefined) ? (mat_dat[3]) : '0';

              callback(null, materia, line);
            }
          });
        }else{
          console.log("LINEA NO ES MATERIA");
          callback(null, materia, line);
        } 

    }, function parseDoc(materia, line, callback){
      if(err){
        console.log("error");
      }
      console.log("||| Parseo docente |||");
        //Proceso linea Docente
        if(line.indexOf("Docente:") != -1){
          var doc = line.split(':', 2)[1];
          materia.docente = doc.trim();
          callback(null, materia, line);
        }else{
          callback(null, materia, line);
        }
        

    }, function parseCarr(materia, line, callback){
        //Proceso linea Carreras
        console.log("||| Parseo carreras |||");
        if(line.indexOf("Carreras:") != -1){
          var carreras = line.split(':', 2)[1];
          materia.carreras = carreras.trim();
          callback(null, materia, line);
        }else{
          callback(null, materia, line);
        }

     }, function parseCurso(materia, line, callback){
      console.log("||| Parseo curso |||");
          if(line.indexOf("Curso:") != -1){
            var curso = line.split(':', 2)[1];
            materia.curso = curso.trim();
            callback(null, materia, line);
          }else{
            callback(null, materia, line);
          }
        
     }, function parseHor(materia, line, callback){
         console.log("||| Parseo horarios |||");
           if(line.indexOf("Aula:") != -1){
            materia.horarios.push(line.trim());
            callback(null, materia);
          }else{
            callback(null, materia);
          }
     }], function(err, materia){ // waterfall - ckend
        console.log("END WATERFALL");
        console.log(JSON.stringify(materia));
        // Return results to main process
              if(err){
                console.log(err); //ver si ok
              }

          }
      );
}

var materia  = {};
materia.horarios = [];
rl.on('line', function (line) {
  if(line !== '' && line !== '"'){
  	console.log(' ----  Line from file: ----', line);
    parseCSV(line, materia);
          
   }
});


/*
async.waterfall([ // waterfall - begin
      function (callback){
       
          callback(null, url, query);
     
        
      }, function(url, query, callback){

        

        callback(null, url);
      }


      ], function(err, result){ // waterfall - ckend
             // Return results to main process
              if(err){
                callback(err, ); //ver si ok
              }

          }
      );
*/

  //  if(line.indexOf("Materia:") != -1){
               
            //     //Guardo en redis el objeto
            //     redislib.insertRedis(materia.curso, materia.codigo, JSON.stringify(materia), function(err, response){
            //       console.log("Insert in redis");
            //       console.log(JSON.stringify(materia));
            //       if(err){
            //         callback(err);
            //         console.log(err);
            //       }else{
            //         console.log(response);
            //         console.log("before clear horarios");
            //         console.log(materia.horarios);
            //         materia.horarios.clear();
            //         console.log("after clear horarios");
            //         console.log(materia.horarios);
            //         var mat = line.split(':', 3)[1];
            //         var mat_dat = mat.split('-');
            //         console.log("MAT");
            //         console.log(mat);
            //         materia.codigo = (mat_dat[0] != undefined) ? (mat_dat[0]).trim() : '0';
            //         materia.nombre = ((mat_dat[1]) != undefined) ? (mat_dat[1]).trim() : '0';
            //         materia.vacantes = (mat_dat[3] != undefined) ? (mat_dat[3]) : '0';
            //       }
            //     });
            //   }else if(line.indexOf("Docente:") != -1){
            //     var doc = line.split(':', 2)[1];
            //     materia.docente = doc.trim();
            //   }else if(line.indexOf("Carreras:") != -1){
            //     var carreras = line.split(':', 2)[1];
            //     materia.carreras = carreras.trim();
            //   }else if(line.indexOf("Curso:") != -1){
            //     var curso = line.split(':', 2)[1];
            //     materia.curso = curso.trim();
            //   }else if(line.indexOf("Aula:") != -1){
            //     materia.horarios.push(line.trim());
            //   }
            //   console.log(JSON.stringify(materia));