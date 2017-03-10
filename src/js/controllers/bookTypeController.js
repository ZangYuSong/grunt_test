/**
 * Created by Zang on 2017/3/10.
 */
define(['services/loadService'], function (app) {
    app.register.controller('bookTypeController', ['$scope', 'loadJson',
        function ($scope, loadJson) {
            loadJson.request('js/data/bookType.json')
                .success(function (data) {
                    $scope.bookTypeDatas = data;
                });
        }]);
});