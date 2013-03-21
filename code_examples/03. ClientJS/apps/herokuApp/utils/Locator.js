(function (App) {
	"use strict";
	App.utils = App.utils || {};

	App.utils.Locator = {
		getLocation: function (callback) {
			var self = this,
				geo;

			try {
				geo = navigator.geolocation,
				geo.getCurrentPosition(function (coords) {
					self._locationSuccess(coords, callback);
				},function () {
					self._locationError(err, callback);
				});
			} catch (e) {
				callback('No location available');
			}
		},
		_locationError: function (err, callback) {
			callback(err);
		},
		_locationSuccess: function (data, callback) {
			callback(null, data.coords);
		}
	};

})(APP);
