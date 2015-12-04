var CursoController = require('./controllers/CursoController');
var InscripcionController = require('./controllers/InscripcionController');

module.exports = function(app){
          
    app.get('/', CursoController.Search);
 
    app.get('/other', CursoController.Other);

    app.get('/new/:code/:curso', InscripcionController.New);   
 
 	app.post('/new/confirm', InscripcionController.Confirm);

 	app.get('/inscripciones/:padron', InscripcionController.All);

 	app.post('/index', CursoController.Index);
};