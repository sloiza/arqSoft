var CursoController = require('./controllers/CursoController');
var InscripcionController = require('./controllers/InscripcionController');
var LoginController = require('./controllers/LoginController');

module.exports = function(app){
          
    app.get('/', LoginController.Login);

    app.get('/search', CursoController.Search);
 
    app.get('/other', CursoController.Other);

    app.post('/new', InscripcionController.New);   
 
 	app.post('/new/confirm', InscripcionController.Confirm);

 	app.get('/inscripciones/:padron', InscripcionController.All);

 	app.post('/index', CursoController.Index);
};