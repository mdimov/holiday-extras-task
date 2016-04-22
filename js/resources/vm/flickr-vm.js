define(['jquery', 'helpers/lib'], function($, lib) {
	window.flickr = {};

	var FlickrViewModel = function() {
		var self = this;

		self.tiles = ko.observableArray();
		self.search = ko.observable('');
		self.loading = ko.observable(false);
	};

	FlickrViewModel.prototype.addTiles = function(tiles) {
		for (var i in tiles) {
			this.tiles().push(tiles[i]);
		}

		this.tiles.notifySubscribers();
	};

	FlickrViewModel.prototype.removeAllTiles = function() {
		this.tiles.removeAll();
	};

	FlickrViewModel.prototype.fetchFeed = function(doEmpty, search) {
		if (this.loading())
			return;

		var self = this,
			url = location.protocol + '//api.flickr.com/services/feeds/photos_public.gne?format=json';

		self.loading(true);

		if ( typeof search != 'undefined' ) {
			self.search(search);
		}
		
		if (self.search().length > 0) {
			url = lib.insertParam(url, 'tags', self.search());
		}

		if (!!doEmpty) {
			flickr.vm.removeAllTiles();
		}

		var options = {
			url: 			url,
			dataType: 		'jsonp',
			processData: 	false,
			contentType: 	false,
			crossDomain: 	true,
			success: function () {
				self.loading(false);
			},
			error: function (serverError, status) {
				if ( serverError.status != 200 ) {
					console.info('Error({0}): {1}'.format(serverError.status, serverError.statusText));
				}

				self.loading(false);
			},
			fail: function(error, status) {
				console.info('Fail, status: {0}'.format(status));

				self.loading(false);
			}
		};

		$.ajax(options);
	}

	flickr.vm = new FlickrViewModel();

	var FlickrTileModel = function(json) {
		var self = this;

		self.title = json.title;
		self.link = json.link;
		self.author = json.author;
		self.tags = json.tags.trim().length > 0 ? json.tags.trim().split(' ') : [];
		self.image = json.media.m;

		self.getImage = function() {
			return self.image.replace('_m\.', '\.');
		}
	};

	window.jsonFlickrFeed = function(json) {
		if (! ('items' in json) )
			return;

		var tiles = [];

		for ( var i in json.items ) {
			tiles.push(new FlickrTileModel(json.items[i]));
		}

		flickr.vm.addTiles(tiles);
	};

});