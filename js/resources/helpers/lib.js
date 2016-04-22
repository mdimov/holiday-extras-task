define (['jquery'], function ($) {
	String.prototype.format = function () {
		var result = this;
		for (var i = 0; i < arguments.length; ++ i)
			result = result.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);

		return result;
	}

	function insertParam(url, key, value) {
	    key = escape(key);
	    value = escape(value);

	    if (url.indexOf("#") > 0) {
	        url = (url.split("#"))[1];
	    }

	    url = url.split("?");
	    if (url.length == 2) {
	        var kvp = url[1].split('&'),
	            x;

	        for (var i = kvp.length - 1; 0 <= i; i--) {
	            x = kvp[i].split('=');

	            if (x[0] == key) {
	                x[1] = value;
	                kvp[i] = x.join('=');
	                break;
	            };
	        }
	        if (i < 0) {
	            kvp[kvp.length] = [key, value].join("=");
	        }
	        url[1] = kvp.join('&');
	    } else {
	        url[1] = [key, value].join("=");
	    }

	    return url.join("?");
	};

	function loadCSS(url) {
	    var link = document.createElement("link");
	    link.type = "text/css";
	    link.rel = "stylesheet";
	    link.href = url;
		
		document.getElementsByTagName("head")[0].appendChild(link);
	};

	function throttle(fn, threshhold, scope) {
	    threshhold || (threshhold = 250);
	    var previous, deferTimer;

	    return function() {
	        var context = scope || this,
	            current = Date.now(),
	            args = arguments;

	        if (previous && current < previous + threshhold) {
	            clearTimeout(deferTimer);

	            deferTimer = setTimeout(
	                function() {
	                    previous = current;
	                    fn.apply(context, args);
	                }, threshhold
	            );
	        } else {
	            previous = current;

	            fn.apply(context, args);
	        }
	    };
	};

	return {
		loadCSS: loadCSS,
		throttle: throttle,
		insertParam: insertParam		
	}
});