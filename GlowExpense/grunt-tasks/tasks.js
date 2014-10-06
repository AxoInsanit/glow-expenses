'use strict';

module.exports = function(grunt) {
    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            grunt.task.run([
				'build',
				'open:dist',
				'connect:dist:keepalive'
			]);
			return;
		}

        grunt.task.run([
//            'jshint',
            'bowerInstall',
            'compass:dev',
//            'csslint',
            'start-mockey',
            'connect:livereload',
            'open:server',
            'ngconstant:development',
			'clean:temp',
            'watch'
        ]);
        
    });

    //runs mockey from console and waits
    grunt.registerTask('run-mockey', ['shell:mockey']);

    //mockey async for internal use
    grunt.registerTask('start-mockey', ['shell:mockey-async']);
    grunt.registerTask('kill-mockey', ['shell:mockey-async:kill']);


	//runs on android device (connected or genymotion)
    grunt.registerTask('e', ['build','shell:emulate-android']);

    grunt.registerTask('a', ['build','shell:android-run']);


    grunt.registerTask('android-release', [
		'clean:cordova',
		'replace:configXML',
		'build',
		'shell:android-build',
		'shell:jarsigner',
		'copy:apk'
	]);


//    grunt.registerTask('run-e2e', [
//        'connect:test',
//        'selenium_start',
//        'protractor:e2e',
//        'selenium_stop'
//    ]);

//    grunt.registerTask('run-utest', [
//        'karma:unit'
//    ]);

//    grunt.registerTask('test', [
//        'run-utest',
//        'run-e2e'
//    ]);

    
    grunt.registerTask('build', [
//        'jshint',
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
		'clean:temp'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);

    grunt.registerTask('production', [
        'ngconstant:production'
    // Add further deploy related tasks here
    ]);

    grunt.registerTask('staging', [
        'ngconstant:staging'
    // Add further deploy related tasks here
    ]);

    // commit task for git
//    grunt.registerTask('git-commit', ['jshint','test']);

//    grunt.registerTask('register-git-hooks', [
//        'githooks'
//    ]);

    grunt.registerTask('emulate-android', [
        'shell:emulate-android'
    ]);
};