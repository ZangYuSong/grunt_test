define(['app'], function (app) {
    app.register.controller("loginController", ['$scope', '$location',
        function ($scope, $location) {
            $scope.login = function () {
                $scope.prompt = '正在登录。。。';
                if ($scope.user.email == '1272695037@qq.com' && $scope.user.password == 'zaz3413887..*') {
                    $location.path('/bookList');
                } else {
                    $scope.prompt = '用户名或者密码输入错误';
                }
            };
            $scope.reset = function () {
                $scope.user = {
                    email: '',
                    password: '',
                    checkout: false
                };
            }
        }]);
});