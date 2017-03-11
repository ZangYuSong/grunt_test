/**
 * Created by Zang on 2017/3/10.
 */
define(['services/loadService'], function (app) {
    app.register.controller('bookTypeController', ['$scope', '$stateParams', 'loadJson',
        function ($scope, $stateParams, loadJson) {
            loadJson.request('js/data/bookType.json')
                .success(function (data) {
                    $scope.bookTypeDatas = data;
                });
        }]);
});