define(['app'], function (app) {
    app.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/index');
            $stateProvider
                .state('index', {
                    url: '/index',
                    views: {
                        '': {
                            templateUrl: 'js/tpl/login.html',
                            resolve: {
                                loadFile: app.loadFile("controllers/loginController")
                            }
                        }
                    }
                })
                .state('bookList', {
                    url: '/bookList',
                    views: {
                        '': {
                            templateUrl: 'js/tpl/bookList.html'
                        },
                        'bookType@bookList': {
                            templateUrl: 'js/tpl/bookType.html',
                            resolve: {
                                loadFile: app.loadFile("controllers/bookTypeController")
                            }
                        },
                        'bookGrid@bookList': {
                            templateUrl: 'js/tpl/bookGrid.html'
                        }
                    }
                });
        }]);
});