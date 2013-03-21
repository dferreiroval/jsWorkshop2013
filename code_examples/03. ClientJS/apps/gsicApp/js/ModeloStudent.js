function ModeloStudent () {
	    this.domain = 'http://gsic-cors.herokuapp.com/';
	    this.path = 'students/';
}

ModeloStudent.prototype = {
	getStudentByClass: function (classID, callback) {
		var url = this.domain + this.path + classID,
			self = this;

		$.getJSON(url, $.proxy(this.parseObject, this));
	},
	parseObject: function (data, callback) {
		console.log('fOooo!');
		callback(data.students);
	}
}