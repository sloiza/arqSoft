function iniciar(response) {
	console.log("Manipulador de petición 'iniciar' fue llamado.");
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("Hola Iniciar");
	response.end();
}

function subir(response) {
	console.log("Manipulador de petición 'subir' fue llamado.");
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("Hola Subir");
	response.end();
}

function cursos(response){
	console.log("Get cursos");
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("Get cursos");
	response.end();
}

exports = {
	iniciar : iniciar,
	subir : subir,
	cursos : cursos
}
