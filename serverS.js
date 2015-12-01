var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');

//Nos permite obtener data de POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;   // puerto por defecto

var router = express.Router(); 
app.use('/', router);

//GET localhost:8080/cursos 
router.get('/cursos', function(req, res) {
    res.json({ message: 'GET: Obtener cursos' });   
});

//POST localhost:8080/inscripcion
router.post('/inscripcion', function(req, res) {
    res.json({ message: 'POST: nueva inscripcion' });   
});


// START THE SERVER
app.listen(port);
console.log('Server is running on port ' + port);