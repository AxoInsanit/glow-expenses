'use strict';
module.exports = function(grunt) {
    grunt.config('clean', {
        dist: {
            files: [{
                dot: true,
                src: [
                    '<%= grunt.config.dist %>/*',
                    '!<%= grunt.config.dist %>/.git*'
                ]
            }]
        },
		temp: {
            files: [{
                dot: true,
                src: [
                    '.sass-cache',
                    '.tmp'
                ]
            }]
        },
		cordova: {
            files: [{
                dot: true,
                src: [grunt.config.cordova +'/www',
//					grunt.config.cordova +'/platforms/android/assets',
					grunt.config.cordova +'/platforms/android/ant-build',
					grunt.config.cordova +'/platforms/android/ant-gen',
					grunt.config.cordova +'/platforms/android/CordovaLib/ant-build',
					grunt.config.cordova +'/platforms/android/CordovaLib/ant-gen'
				]
            }]
        }
    });
};