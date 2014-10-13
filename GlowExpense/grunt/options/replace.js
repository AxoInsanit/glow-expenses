'use strict';
module.exports = function(grunt) {
    grunt.config('replace', {
		configXML: {
			src: [grunt.config.cordova + '/config.xml'], overwrite: true,
			replacements: [{
				from: /(version=\")([\d.]+)(\")/,
				to: '$1'+grunt.config.pkg.version+'$3'
			}]
		},
	    setProduction: {//on cordova
			src: [grunt.config.cordova + '/www/scripts/*.scripts.js'], overwrite: true,
			replacements: [{
				from: /setupEnvironment\("(localhost|emulator)"\)/,
				to: 'setupEnvironment("production")'
			}]
		},
		weinrePlaceholder: {
			src: [grunt.config.cordova + '/www/index.html'], overwrite: true,
			replacements: [{
				from: '<!--weinre-->',
				to: '<script src="http://'+ grunt.config.ip +':'+ grunt.config.WEINRE_PORT +'/target/target-script-min.js#grunt"></script>'
			}]
		}
    });
};