var express    = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var handlebars  = require('express-handlebars'), hbs;
var app        = express();

/* express-handlebars - https://github.com/ericf/express-handlebars
A Handlebars view engine for Express. */
hbs = handlebars.create({
   defaultLayout: 'Main'
});

//Nos permite obtener data de POST
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'static')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

require('./router')(app);

//var port = process.env.PORT || 8080;   // puerto por defecto
app.set('port', 8080);
app.set('views', path.join(__dirname, 'views'));

// START THE SERVER
app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));
//console.log('Server is running on port ' + port);
//http.createServer(app).listen(app.get('port'), function(){
//  console.log('Express server listening on port ' + app.get('port'));
//});