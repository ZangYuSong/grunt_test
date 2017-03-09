define(["app"], function (app) {
    app.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/index');
            $stateProvider.state('index', {
                url: '/index',
                views: {
                    '': {
                        templateUrl: 'tpl/home.html'
                    },
                    'main@index': {
                        templateUrl: 'tpl/login.html',
                        resolve: {
                            loadFile: app.loadFile("controllers/loginController")
                        }
                    }
                }
            });
        }]);
});