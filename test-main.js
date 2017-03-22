var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
        // then do not normalize the paths
        var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
        allTestFiles.push('../../' + normalizedTestModule);
    }
});

require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base/src/js',
    map: {
        '*': {
            'css': '../framework/require-css/css.min' // or whatever the path to require-css is
        }
    },
    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start,
    paths: {
        'angular': '../framework/angular-1.4.6/angular.min',
        'uiRouter': '../framework/angular-ui-router/ui-router',
        'uiGrid': '../framework/angular-ui-grid/ui-grid.min',
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
            deps: ['angular'] // angular-ui-router-router 依赖 angular
        },
        'bootstrap': {
            deps: ['jquery', 'css!../framework/bootstrap-3.3.7-dist/css/bootstrap.min']
        },
        'uiGrid': {
            deps: ['angular', 'css!../framework/angular-ui-grid/ui-grid.min']
        },
        'oclazyLoad': {
            deps: ['angular']
        }
    }
});

require(['routers/mainRouter'], function () {
    // 手动启动 angular，不要使用 ng-app='Demo' 来定义
    angular.bootstrap(document, ['BookStore']);
});
