require.config({
    // 所有模块的查找根路径
    baseUrl: 'js',
    map: {
        '*': {
            'css': '../framework/require-css/css.min' // or whatever the path to require-css is
        }
    },
    // path映射那些不直接放置于baseUrl下的模块名
    paths: {
        'angular': '../framework/angular-1.4.6/angular.min',
        'uiRouter': '../framework/angular-ui-router/ui-router',
        'ngGrid': '../framework/angular-ui-grid/ui-grid.min',
        'bootstrap': '../framework/bootstrap-3.3.7-dist/js/bootstrap.min',
        'jquery': '../framework/jquery-1.11.3/jquery'
    },
    // 为那些没有使用define()来声明依赖关系、设置模块的'浏览器全局变量注入'型脚本做依赖和导出配置
    shim: {
        'angular': {
            // 表明这个模块外部调用时的名称
            exports: 'angular'
        },
        'uiRouter': {
            deps: ['angular'], // angular-ui-router-router 依赖 angular
            exports: 'uiRouter'
        },
        'bootstrap': {
            deps: ['jquery', 'css!../framework/bootstrap-3.3.7-dist/css/bootstrap.min']
        },
        'ngGrid': {
            deps: ['css!../framework/angular-ui-grid/ui-grid.min']
        }
    },
    // RequireJS获取资源时附加在URL后面的额外的query参数
    urlArgs: 'bust=' + (new Date()).getTime()
});

require(['bootstrap', 'routers/mainRouter'], function () {
    // 手动启动 angular，不要使用 ng-app='Demo' 来定义
    angular.bootstrap(document, ['BookStore']);
});