var $ = require('jquery');
var util = require('./util');

var modelo = new util();

$(document).ready(function() {
	//jQuery code goes here
	$('#padron').on('input', function() {
		var input=$(this);
		var padron=input.val();
		if(modelo.validarPadron(padron)){input.css("background-color", "green");}
		else{input.css("background-color", "red");}
	});
});

//$('h2').html(modelo.validarPadron(bla));
