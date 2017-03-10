define(['app'], function (app) {
    app.register.controller("loginController", ['$scope', '$state',
        function ($scope, $state) {
            $scope.user = {
                email: '1272695037@qq.com',
                password: 'zaz3413887..*',
                checkout: true
            };
            $scope.login = function () {
                $scope.prompt = '正在登录。。。';
                if ($scope.user.email == '1272695037@qq.com' && $scope.user.password == 'zaz3413887..*') {
                    // 传递参数
                    // 页面使用 ui-sref='/bookList({bookType: 0})'
                    $state.go('bookList', {bookType: 0});
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