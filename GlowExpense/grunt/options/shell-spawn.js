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

	    "ios-run": {
		    options: {
			    stdout: false,
			    failOnError: true,
			    stdin: true,
			    execOptions: {
				    maxBuffer: Infinity,
				    cwd:  grunt.config.cordova
			    }
		    },
		    command: "cordova run ios --debug --device"
	    },

	    'iosBuild': {
		    options: {
			    stdout: false,
			    failOnError: true,
			    stdin: true,
			    execOptions: {
				    cwd:  grunt.config.cordova,
				    maxBuffer: Infinity
			    }
		    },
		    command: [
			    'cordova build ios --release --device',
			    'xcrun -sdk iphoneos PackageApplication -v "platforms/ios/build/device/'+  grunt.config.pkg.name +'.app" -o "`pwd`/platforms/ios/build/device/'+ grunt.config.pkg.name +'.ipa"'
		    ].join("&&")
	    },

	    "fixMacPermissions": {
		    options: {
			    stdout: true,
			    failOnError: true,
			    stdin: true,
			    execOptions: {
				    cwd: grunt.config.cordova
			    }
		    },
		    command: [
			    'chmod -R 777 platforms/android/cordova/*',
			    'chmod -R 777 platforms/ios/cordova/*'
		    ].join("&&")
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