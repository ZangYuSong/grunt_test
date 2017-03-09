define(["app"], function (app) {
    app.registerController("loginController", function ($scope) {
        $scope.login = function () {
            alert(angular.toJson($scope.user));
        }
        $scope.reset = function () {
            $scope.user = {
                email: '',
                password: '',
                checkout: false
            };
        }
    });
});