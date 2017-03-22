module.exports = function (grunt) {
    // 配置所有插件信息
    grunt.initConfig({
        // 获取 package.json 的信息
        pkg: grunt.file.readJSON("package.json"),

        // concat 插件配置项，合并文件
        concat: {
            options: {
                // 定义一个用于插入合并输出文件之间的字符
                separator: ';'
            },
            dist: {
                // 将要被合并的文件
                src: ['src/js/**/*.js'],
                // 合并后的JS文件的存放位置
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        // uglify 插件的配置信息，用于压缩文件
        uglify: {
            options: {
                // 此处定义的banner注释将插入到输出文件的顶部
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    // 将 concat 合并后的文件进行压缩
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        // jshint 插件配置信息，检查 javascript 语法
        jshint: {
            files: ['src/js/**/*.js', 'test/**/*.js']
        },

        // watch 插件的配置信息，检测文件的变化
        watch: {
            // 监控变化的文件
            files: ['<%= jshint.files %>'],
            // 变化之后执行哪些操作
            tasks: ['jshint', 'qunit']
        },

        qunit: {
            files: ['test/**/*.html']
        }
    });
    // 告诉 grunt 使用插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // 告诉终端我们输入 grun 他需要做什么，注意先后顺序。 只需在命令行上输入"grunt"
    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
    // 在命令行上输入"grunt test"，test task就会被执行。
    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('watch', ['watch']);
};