APP = (function () {
	"use strict";

	var App = {
		initializeNamespace: function () {
			this.models = {};
			this.utils = {};
		},
		initialize: function (config) {
			this._started = true;
			this.geoModel = new APP.models.YahooGeoModel(),
			this.twitterModel = new APP.models.TwitterJSONModel(),
			this.locator = APP.utils.Locator;
			this._compileTemplates();
		},
		_compileTemplates: function (){
			var trending   = $("#trends-template").html();
			this.trendsTemplate = Handlebars.compile(trending);
		},
		run: function () {
			var self = this,
				locator;

			if (!this._started) {
				this.initialize();
			}

			locator = this.locator;
			locator.getLocation(function () { 
				self._onGetLocation.apply(self, arguments);
			});
		},
		_onGetLocation: function (err, data) { 
			var self = this,
				geoModel = this.geoModel,
				location;

			if (err) {
				console.log('Couldnt retrieve location, switching to default...');
			} else {
				location = data;
			}
			geoModel.getWoeidByLocation(location, function () {
				self._onGetWoeid.apply(self, arguments);
			});
		},
		_onGetWoeid: function (err, placeObj) {
			var self = this,
				twitterModel = this.twitterModel;

			if (err) {
				console.log('Couldnt get woeid, switching to world trending...');
			} else {
				twitterModel.setWoeid(placeObj.woeid);
			}
			twitterModel.getTrends(function (){
				self._onGetTrendingTweets.apply(self, arguments);
			});
		},
		_onGetTrendingTweets:function (err, data) {
			var tmp;
			if (err) {
				console.log(err);
			} else {
				tmp = data && data[0] && data[0];
				this._renderTrendingTweets(tmp);
			}
		},
		_renderTrendingTweets: function (trends) {
			var rendered = this.trendsTemplate(trends);
			$('.tweets').removeClass('loading').html(rendered);
		}
	};

	App.initializeNamespace();
	return App;
})();

	
