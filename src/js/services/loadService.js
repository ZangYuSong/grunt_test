/**
 * Created by Zang on 2017/3/10.
 */
define(['app'], function (app) {
    app.register.factory('loadJson', ['$http',
        function ($http) {
            var _request = function (url) {
                return $http({
                    method: 'GET',
                    url: url
                });
            };
            return {
                request: function (url) {
                    return _request(url);
                }
            };
        }
    ]);
    return app;
});