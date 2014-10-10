'use strict';
module.exports = function(grunt) {
    grunt.config('weinre', {
		options: {
			httpPort: grunt.config.WEINRE_PORT,
			boundHost: '-all-'
		},

		dev: {
			options: {
				verbose: false,
				debug: false,
				readTimeout: 5,
				deathTimeout: 15
			}
		}
    });
};