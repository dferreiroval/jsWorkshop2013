YUI.add('ClassModel', function (Y) {

	"use strict";
	var CS = Y.namespace('models');

	function ClassModel () {

	}

	ClassModel.prototype = {

		_sendRequest: function (url, callback) {
			//Y.jsonp
		},
		_successRequest: function () {

		},
		_errorRequest: function () {

		}
	};

	CS.ClassModel = ClassModel;
	
}, "@", {
    requires:['io', 'jsonp']
});