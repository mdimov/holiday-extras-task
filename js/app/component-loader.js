define(['knockout', 'jquery', 'helpers/lib'], function (ko, $, lib) {
	var templateBasePath = "text!components/{0}/template.html",
		viewModelBasePath = "components/{0}/view-model",
		scriptIDTemplate = "script#{0}",
		cssBasePath = "js/resources/components/{0}/style.css",
		customElements = ['tiles'];

	var componentLoader = {
		getConfig: function(name, callback) {
	        var viewModelConfig = { require: viewModelBasePath.format(name) },
				templateConfig = null,
				scriptID = scriptIDTemplate.format(name);

			if ($(scriptID).length == 0) {
	            templateConfig = { require: templateBasePath.format(name) };
			}
			else {
				templateConfig = { element: name };
			}

	        callback({ viewModel: viewModelConfig, template: templateConfig });
	    },

		loadTemplate: function (name, templateConfig, callback) {
			var cssPath = cssBasePath.format(name);
			
			lib.loadCSS(cssPath, true);

			callback(null);
		}
	};

	function init() {
		ko.components.loaders.unshift(componentLoader);

		flickr.components = [];

		for (var i in customElements) {
			ko.components.register(customElements[i], { });
		}
	}

	return {
		init: init
	};
});
