/**
 * Created by Zang on 2017/3/11.
 */
define(['services/loadService'], function (app) {
    app.register.controller('bookGridController', ['$scope', '$stateParams', 'loadJson',
        function ($scope, $stateParams, loadJson) {
            console.log($stateParams.bookType);
        }]);
});