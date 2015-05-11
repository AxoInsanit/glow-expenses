'use strict';

module.exports = function(grunt) {
    grunt.registerTask('serve', function (target) {
        var tasks = [];

        if(grunt.option('mockey')) {
            tasks.push('start-mockey');
        }

        tasks.push(
            'jshint', 
            'bowerInstall',
            'compass:dev', 
            // 'csslint',
            'connect:livereload',
            'open:server',
            'ngconstant:development',
            'clean:temp',
            'watch'
        );

        if (target === 'dist') {
            grunt.task.run([
				'build',
				'open:dist',
				'connect:dist:keepalive'
			]);
			return;
		}
        grunt.task.run(tasks);
    });

    //runs mockey from console and waits
    grunt.registerTask('run-mockey', ['shell:mockey']);

    //mockey async for internal use
    grunt.registerTask('start-mockey', ['shell:mockey-async']);
    grunt.registerTask('kill-mockey', ['shell:mockey-async:kill']);


	//runs on emulator
    grunt.registerTask('e', ['build','shell:emulate-android']);

	//runs on android device (connected or genymotion)
    grunt.registerTask('a', ['build','shell:android-run']);

	//runs on device with weinre! (be care full, this computer and device should be on the same network)
	grunt.registerTask('aw', [
		'build',
		'replace:weinrePlaceholder',
		'concurrent:weinre'
	]);

    grunt.registerTask('android-release', [
		'clean:cordova',
		'replace:configXML',
		'build',
		'shell:android-build',
		'shell:jarsigner',
		'copy:apk'
	]);
    
    //runs on iOS device (connected)
    grunt.registerTask('i', ['build','shell:ios-run']);

    grunt.registerTask('build', [
       'jshint',
       'bowerInstall',
	    grunt.config.os === 'Mac' ? 'shell:fixMacPermissions' : 'nothing',
        'clean:dist',
        'bowerInstall',
        'compass:dist',
        'ngconstant:production',
        'useminPrepare',
        'concat',
        'concurrent:dist',
        'cssmin',
        'cdnify',
        'ngmin:dist',
        'uglify:dist',
        'rev',
        'usemin',
        'copy:dist',
		'clean:cordova',
		'copy:cordova',
	    'replace:setProduction',
		'clean:temp'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);

	//auxiliars
    grunt.registerTask('nothing', []);

    grunt.registerTask('production', [
        'ngconstant:production'
    // Add further deploy related tasks here
    ]);

    grunt.registerTask('staging', [
        'ngconstant:staging'
    // Add further deploy related tasks here
    ]);

    grunt.registerTask('emulate-android', [
        'shell:emulate-android'
    ]);
};