'use strict';
module.exports = function(grunt) {
    var mockey_command = 'java -jar ./tools/mockey/Mockey.jar --location .';
    grunt.config('shell', {
        //async
        'mockey-async':{
            command: mockey_command,
            options: {
                async: true,
                execOptions: {
                    cwd: './'
                }
            }
        },
        //sync
        'mockey':{
            command: mockey_command,
            options: {
                async: false,
                execOptions: {
                    cwd: './'
                }
            }
        },

        'emulate-android': {
			options: {
				stdout: true,
				failOnError: true,
				stdin: true,
				execOptions: {
					cwd:  grunt.config.cordova
				}
			},
			command: 'cordova emulate'
        },

		'android-run': {
			options: {
				stdout: true,
				failOnError: true,
				stdin: true,
				execOptions: {
					cwd:  grunt.config.cordova
				}
			},
			command: 'cordova run android'
		},

		'android-build': {
			options: {
				stdout: true,
				failOnError: true,
				stdin: true,
				execOptions: {
					cwd:  grunt.config.cordova
				}
			},
			command: 'cordova build android --release'
		},


		'jarsigner': {
			options: {
				stdout: true,
				failOnError: true,
				stdin: true
			},
			command: [
					'jarsigner -verbose -digestalg SHA1 -sigalg MD5withRSA -keystore cert/release.keystore '+
					grunt.config.cordovaAndroid +'/'+ grunt.config.pkg.name +'-release-unsigned.apk ' +
					grunt.config.secAlias +
					' -storepass '+ grunt.config.secStorePass +
					' -keypass '+ grunt.config.secKeypass,
					'jarsigner -verify '+
					grunt.config.cordovaAndroid +'/'+ grunt.config.pkg.name +'-release-unsigned.apk' +
					' -keystore cert/release.keystore',
					'zipalign -v 4 '+
					grunt.config.cordovaAndroid +'/'+ grunt.config.pkg.name +'-release-unsigned.apk '+
					grunt.config.cordovaAndroid +'/'+ grunt.config.pkg.name +'.apk'
			].join('&&')
		},

		options: {
            stdout: true,
            stderr: true,
            failOnError: true
        }
    });
};