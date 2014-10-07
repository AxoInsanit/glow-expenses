// Generated on 2013-07-10 using generator-angular 0.3.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // load task timming plugin
    require('time-grunt')(grunt);

    // config
	grunt.config.pkg = grunt.file.readJSON('package.json');
    grunt.config.app = 'app';
    grunt.config.dist = 'dist/www';
    grunt.config.distApk = 'dist/apk';
    grunt.config.core = 'core';
	grunt.config.os = 'Msac'; //Mac or PC
    grunt.config.ip = '10.0.1.2';//for local work and weinre
	grunt.config.cordova = 'cordova';
	grunt.config.cordovaAndroid = grunt.config.cordova + '/platforms/android/ant-build';
	grunt.config.secAlias = 'androidreleasekey';
	grunt.config.secStorePass = 'provisoryKey1';
	grunt.config.secKeypass = 'provisoryKey1';
    grunt.config.WEINRE_PORT = 8082;
    grunt.config.LIVERELOAD_PORT = 35729;
    grunt.config.SERVER_DEV_PORT = 9000;
    grunt.config.SERVER_DIST_PORT = 9010;

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // load defualts tasks and configs
    grunt.loadTasks('grunt-tasks/');
    grunt.loadTasks('grunt-tasks/options');
};
