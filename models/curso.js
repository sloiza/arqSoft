var Curso = function (data) {  
    this.data = data;
}

Curso.prototype.data = {}

Curso.prototype.changeName = function (name) {  
    this.data.name = name;
}

Curso.prototype.get = function (name) {  
    return this.data[name];
}

Curso.prototype.set = function (name, value) {  
    this.data[name] = value;
}

Curso.findAll = function (callback) {  
    var curso1 = new Curso({name: "Arquitectura de Software", code: "1111"});
    var curso2 = new Curso({name: "Sistemas Gráficos", code: "2222"});
    var cursos = [curso1, curso2]
    callback(null, cursos);
}

module.exports = Curso;