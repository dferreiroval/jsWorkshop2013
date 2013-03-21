// Yahoo Model
(function (App) {
	"use strict";

	var geoApi = 'http://api.flickr.com/services/rest/',
		geoApiKey = '07518c5da6dcda6f2d8126ca45fbf085',
		geoMethodWoeid = 'flickr.places.findByLatlon',
		geoFormat = 'json';

	function buildAPIURL (api) {
		var apiURL = api || '';
		return geoApi + '?method=' + api + '&api_key=' + geoApiKey + '&format=' + geoFormat;
	};

	function YahooGeoModel (cfg) {
		var config = cfg || {};
		this.coords = config.coords || {latitude: 40.416371, longitude: -3.702049}; //madrid
		this.accuracy = config.accuracy || 1;
	}

	YahooGeoModel.prototype = {
		getWoeidByLocation: function (coord, callback) {
			var self = this,
				coord = coord || this.coords,
				url = buildAPIURL(geoMethodWoeid),
				location = '&lat='+ coord.latitude + '&lon=' + coord.longitude,
				accuracy = '&accuracy=' + this.accuracy,
				urlAPI = url + accuracy + location;

			this._sendRequest(urlAPI, function (err, data) {
				if (err) {
					callback(err);
				} else  {
					self._parse(data, callback);
				}
			});
			
		},
		setCoordenates: function (coord) {
			this.coord = coord;
		},
		_parse: function (data, callback) {
			var woeid,
				tmp;
				
			tmp = data.places && data.places.place && data.places.place[0];
			tmp = tmp || data;

			callback(null, tmp);
		},
		_sendRequest: function (url, callback) {
			var jsonp = url + '&jsoncallback=?',
				self = this;

			$.getJSON(jsonp, function (data) {
				if (data.errors) {
					self._sendRequestError(data, callback);
				} else {
					callback(null, data);
				}
			});
		},
		_sendRequestError: function (data, callback) {
			callback(data.errors);
		}		
	};
	App.models.YahooGeoModel = YahooGeoModel;
})(APP);
