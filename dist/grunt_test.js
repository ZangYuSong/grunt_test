define(['uiGrid', 'uiRouter'], function () {
    var app = angular.module('BookStore', ['ui.router', 'ui.grid', 'ui.grid.pagination', 'ui.grid.selection',
        'ui.grid.exporter', 'ui.grid.importer']);
    app.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
        function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
            // angular有个启动函数，叫做bootstrap；
            // 根据angular的代码设计，你需要在启动之前定义所有的controller；
            // 就好似有个袋子，你在bootstrap之前想往里塞什么就塞什么；
            // 可是一旦bootstrap了，他就不再接受你任何往里塞的controller了；
            // 解决这个问题，只有一个方法，就是利用主模块的provider主动注册controller；
            // 但是由于provider不能直接使用，所以我们把它存在主模块下面；
            // 通过存下来的方法，可以用来注册异步加载回来的页面组件。
            app.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };
            app.loadFile = function (js) {
                return function ($rootScope, $q) {
                    //通过$q服务注册一个延迟对象 deferred
                    var def = $q.defer(), deps = [];
                    if (angular.isArray(js)) {
                        deps = js;
                    } else {
                        deps.push(js);
                    }
                    require(deps, function () {
                        $rootScope.$apply(function () {
                            // 成功
                            def.resolve();
                            // def.reject() 不成功
                            // def.notify() 更新状态
                        });
                    });
                    //通过deferred延迟对象，可以得到一个承诺promise，而promise会返回当前任务的完成结果
                    return def.promise;
                };
            };
        }]);
    return app;
});;/**
 * Created by Zang on 2017/3/11.
 */
define(['services/loadService'], function (app) {
    app.register.controller('bookGridController', ['$scope', '$stateParams', 'loadJson',
        function ($scope, $stateParams, loadJson) {
            var _filterData = function (data) {
                var _data = [];
                data.forEach(function (item) {
                    if ($stateParams.bookType === "0" || !$stateParams.bookType) {
                        _data = data;
                        return false;
                    }
                    if (item.type === $stateParams.bookType) {
                        _data.push(item);
                    }
                });
                return _data;
            };
            $scope.pageOptions = {
                currentPage: 1,
                pageSize: 5,
                pageSizes: [5, 10, 15]
            };
            loadJson.request('js/data/bookListData.json')
                .success(function (data) {
                    $scope.bookListData = _filterData(data);
                    $scope.totalItems = data.length;
                });

            $scope.info = function () {
                if ($scope.gridApi.selection.getSelectedCount() !== 1) {
                    alert('请选择一条信息');
                } else {
                    alert($scope.gridApi.selection.getSelectedRows()[0].title);
                }
            };
            $scope.del = function () {
                if ($scope.gridApi.selection.getSelectedCount() === 0) {
                    alert('请选择至少一条信息');
                } else {
                    alert($scope.gridApi.selection.getSelectedRows()[0].title);
                }
            };
            $scope.gridOptions = {
                data: 'bookListData',
                enableGridMenu: true, // 是否显示grid 菜单
                showGridFooter: true, // 是否显示grid footer
                enableHorizontalScrollbar: 1, // grid水平滚动条是否显示, 0-不显示  1-显示
                enableVerticalScrollbar: 0, // grid垂直滚动条是否显示, 0-不显示  1-显示
                enableSorting: true,   // 允许排序
                /**
                 * 默认为真。启用时初始化的网格将检查它是否高到足以显示。
                 * 至少一排数据。如果网格是不够高，它会调整DOM元素来显示minrowstoshow数行。
                 */
                enableMinHeightCheck: true,
                minimumColumnSize: 10,  // 列的最小高度，默认为10px
                /**
                 * 默认为空，使用自定义标头。可以使一段html代码，也可以是具体的html文件。一般不使用
                 *  除此之外还用;footerTemplate gridFooterTemplate rowTemplate gridMenuTemplate
                 */
                headerTemplate: null,

                /**
                 *  使用分页，必须引入模块 ui.grid.pagination
                 */
                enablePagination: true, //是否分页，默认为true
                enablePaginationControls: true, // 使用默认的底部分页
                paginationPageSizes: $scope.pageOptions.pageSizes, // 每页显示个数可选项
                paginationCurrentPage: $scope.pageOptions.currentPage, // 当前页码
                paginationPageSize: $scope.pageOptions.pageSize, // 每页显示个数
                //paginationTemplate:"<div></div>", // 自定义底部分页代码
                totalItems: 'totalItems', // 总数量

                /**
                 *  使用选中，必须引入模块 ui.grid.selection
                 */
                enableFooterTotalSelected: true, // 是否显示选中的总数，默认为true, 如果显示，showGridFooter 必须为true
                enableFullRowSelection: false, //是否点击行任意位置后选中,默认为false,当为true时，checkbox可以显示但是不可选中
                enableRowHeaderSelection: true, // 是否显示选中checkbox框 ,默认为true
                enableRowSelection: true, // 行选择是否可用，默认为true;
                enableSelectAll: true, // 选择所有checkbox是否可用，默认为true;
                modifierKeysToMultiSelect: false,//默认false,为true时只能 按ctrl或shift键进行多选, multiSelect 必须为true;
                multiSelect: true,// 是否可以选择多个,默认为true;
                noUnselect: false,// 默认false,选中后可以取消选中
                selectionRowHeaderWidth: 30,//默认30 ，设置选择列的宽度；

                enableFiltering: true, // 开启过滤，对每一列进行过滤
                columnDefs: [
                    {
                        field: 'index',
                        displayName: '序号',
                        width: 70,
                        enableColumnMenu: false,// 是否显示列头部菜单按钮
                        enableSorting: false
                    },
                    {
                        field: 'title',
                        displayName: '书名'
                    },
                    {
                        field: 'author',
                        displayName: '作者'
                    },
                    {
                        field: 'putTime',
                        displayName: '出版日期'
                    },
                    {
                        field: 'price',
                        displayName: '单价',
                        cellFilter: 'currency:"￥"'
                    }
                ],
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                }
            };
        }]);
});;/**
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
});;define(['app'], function (app) {
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
            };
        }]);
});;define(['app'], function (app) {
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
});;/**
 * Created by Zang on 2017/3/12.
 */
define(['app'], function (app) {
    app.register.factory('bookTypeService', [
        function () {
            this.bookType = '0';
            return {
                getType: function () {
                    return this._bookType;
                },
                setType: function (bookType) {
                    this._bookType = bookType;
                }
            };
        }
    ]);
    return app;
});;/**
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