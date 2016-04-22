var mainDeps = [
	'app/loader',
	'helpers/lib'
];

require(mainDeps, function () {
	require([
			'vm/flickr-vm',
			'app/component-loader',
			'helpers/events'
			], function (vm, components, events) {
		components.init();

		flickr.vm.fetchFeed(true);

		events.init();

		ko.applyBindings(flickr.vm);
	});

});