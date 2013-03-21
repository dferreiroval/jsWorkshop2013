
function ModeloClasses (cfg) {
	var config = cfg || {};
	this.url = config.url;
	this.domain = 'http://gsic-cors.herokuapp.com/classes';
};

ModeloClasses.prototype = {
	/*
	* @Method: getClasses
	* Esta function coge como parametro un callback y 
	* lo ejecuta pasando los datos con las classes
	* callback: function
	*     param: classObject
	*/
	getClasses: function (callback) {
		var domain = this.domain;
		$.getJSON(domain , function(data) {
			callback(data);
		});
	}
};