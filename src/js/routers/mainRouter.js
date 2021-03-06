define(['app'], function (app) {
    app.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/index');
            $stateProvider
                .state('index', {
                    url: '/index',
                    views: {
                        '': {
                            templateUrl: 'tpl/login.html',
                            resolve: {
                                loadFile: app.loadFile("controllers/loginController")
                            }
                        }
                    }
                })
                .state('bookList', {
                    url: '/{bookType:[0-9]}',
                    // 声明接收的参数，否则会过滤掉
                    // params: {'bookType': null},
                    views: {
                        '': {
                            templateUrl: 'tpl/bookList.html'
                        },
                        'bookType@bookList': {
                            templateUrl: 'tpl/bookType.html',
                            resolve: {
                                loadFile: app.loadFile("controllers/bookTypeController")
                            }
                        },
                        'bookGrid@bookList': {
                            templateUrl: 'tpl/bookGrid.html',
                            resolve: {
                                loadFile: app.loadFile(["uiGrid", "controllers/bookGridController"])
                            }
                        }
                    }
                });
        }]);
});