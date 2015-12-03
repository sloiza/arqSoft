var CursoController = require('./controllers/CursoController');
var InscripcionController = require('./controllers/InscripcionController');

module.exports = function(app){
          
    app.get('/', CursoController.Index);
 
    app.get('/other', CursoController.Other);

    app.get('/new/:code', InscripcionController.New);   
 
 	app.post('/new/confirm', InscripcionController.Confirm);
};