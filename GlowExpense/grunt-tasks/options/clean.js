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
                src: [grunt.config.cordova +'/www']
            }]
        }
    });
};