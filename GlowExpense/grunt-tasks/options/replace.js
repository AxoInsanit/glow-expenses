'use strict';
module.exports = function(grunt) {
    grunt.config('replace', {
		configXML: {
			src: [grunt.config.cordova + '/config.xml'], overwrite: true,
			replacements: [{
				from: /(version=\")([\d.]+)(\")/,
				to: '$1'+grunt.config.pkg.version+'$3'
			}]
		}
    });
};