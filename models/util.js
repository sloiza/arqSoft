var Util = function() {

  var self = this;

  return {
    validarPadron: function(padron) {
      return padron.toString().length == 5;
    }
  };
}

module.exports = Util; 