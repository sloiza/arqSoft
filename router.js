var CursoController = require('./controllers/CursoController');

module.exports = function(app){
          
    app.get('/', CursoController.Index);
 
    app.get('/other', CursoController.Other);   
 
};