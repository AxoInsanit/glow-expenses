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
		weinrePlaceholder: {
			src: [grunt.config.cordova + '/www/index.html'], overwrite: true,
			replacements: [{
				from: '<span id="weinre"></span>',
				to: '<script src="http://'+ grunt.config.ip +':'+ grunt.config.WEINRE_PORT +'/target/target-script-min.js#grunt"></script>'
			}]
		}
    });
};