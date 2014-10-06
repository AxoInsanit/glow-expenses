'use strict';
module.exports = function(grunt) {
	grunt.config('open', {
	    server: {
	        url: 'http://'+grunt.config.ip+':<%= connect.options.port %>'
	    },
	    dist: {
	        url: 'http://'+grunt.config.ip+':'+grunt.config.SERVER_DIST_PORT
	    }
//	    e2e:{
//	        url: 'http://localhost:4444/wd/hub'
//	    }
    });
};