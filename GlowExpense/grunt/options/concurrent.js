'use strict';
module.exports = function(grunt) {
    grunt.config('concurrent', {
//        server: [
//            'coffee:dist'
//        ],
//        test: [
//            'coffee'
//        ],
		options: {
			logConcurrentOutput: true
		},

		weinre:['shell:android-run', 'weinre:dev', 'open:weinre'],

		dist: ['imagemin','htmlmin']

    });
};