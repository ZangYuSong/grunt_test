/**
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
            $scope.gridOptions = {
                data: 'bookListData',
                enableGridMenu: true, // 是否显示grid 菜单
                showGridFooter: true, // 是否显示grid footer
                enableHorizontalScrollbar: 1, // grid水平滚动条是否显示, 0-不显示  1-显示
                enableVerticalScrollbar: 0, // grid垂直滚动条是否显示, 0-不显示  1-显示
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

                columnDefs: [
                    {
                        field: 'index',
                        displayName: '序号',
                        width: 70,
                        enableColumnMenu: false,// 是否显示列头部菜单按钮
                        sortable: false,
                        pinnable: false
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
                ]
            };
        }]);
});