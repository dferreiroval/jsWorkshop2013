// Twitter Model
(function (App) {
	"use strict";

	var twitterAPI = 'https://api.twitter.com/',
		twitterVersion = '1',
		//apis
		twitterTrendsByPlace = '/trends/{woeid}',
		twitterTrendsDaily = '/trends/daily',
		//format
		twitterOutput = 'json';

	function buildAPIURL (api) {
		var apiURL = api || '';
		return twitterAPI + twitterVersion + api + '.' + twitterOutput;
	};

	function TwitterModel (cfg) {
		var config = cfg || {};
		this.woeid = config.woeid || 1;
	}

	TwitterModel.prototype = {
		getTrends: function (callback) {
			var woeid = this.woeid,
				trendID = twitterTrendsByPlace.replace('{woeid}', woeid),
				urlAPI = buildAPIURL(trendID);

			this._sendRequest(urlAPI, callback);
			
		},
		getDailyTrends: function (callback) {
			var urlAPI = buildAPIURL(twitterTrendsDaily);
			this._sendRequest(urlAPI, callback);
		},
		setWoeid: function (woeid) {
			this.woeid = woeid;
		},
		_sendRequest: function (url, callback) {
			var jsonp = url + '?callback=?',
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
	App.models.TwitterJSONModel = TwitterModel;
})(APP);
