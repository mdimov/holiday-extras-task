define(['helpers/lib'], function(lib) {
	function infiniteScroll() {
		if ( $(window).scrollTop() > 0 ) {
			$('#go-to-top:not(.active)').addClass('active');
		} else {
			$('#go-to-top').removeClass('active');
		}

		if ( $(window).scrollTop() + $(window).innerHeight() >= $('body')[0].scrollHeight - 600 ) {
			flickr.vm.fetchFeed(false);
		}
	}

	function initEvents() {
		$(window)
			.on('scroll', lib.throttle(infiniteScroll));

		$('#go-to-top')
			.on('click', function(e) {
				e.preventDefault();

				$('html,body').animate({scrollTop:0}, '500');
			});
	}

	function init() {
		initEvents();
	}

	return {
		init: init
	}

});