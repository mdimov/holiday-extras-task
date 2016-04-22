var requireConfig = {
    urlArgs: "v=" + '0.0.3',
    catchError: true,

    paths: {
        components: 'resources/components',
        vm: 'resources/vm',
        helpers: 'resources/helpers',

        knockout: 'lib/knockout-3.4.0.min',
        jquery: 'lib/jquery-2.2.3.min',
        text: 'lib/text',
    },

    text: {
      useXhr: function (url, protocol, hostname, port) {
        // allow cross-domain requests
        // remote server allows CORS
        return true;
      }
    }
};

requirejs.config(requireConfig);

requirejs.onError = function (err) {
    if (err && err.requireType)
        console.warn("Error caught in requirejs: " + err);

    return {};
};

requirejs(['app/main']);