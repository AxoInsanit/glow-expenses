# GLOW - EXPENSES

## INSTALL:

### Prerequisites:
* git
* Android sdk
* nodejs & npm
* cordova cli

### Instalation
* `git clone https://github.com/GlobantMobileStudio/glow-expenses.git`
* `git checkout dev`
* `cd GlowExpense`
* `npm i`
* `bower i`

**You made it!**

## CONFIG:
On localProperties.json there are local configuration for individual workstation
This file content:

	ip = your ip whene you are connected on globant network, this is useful when you use weinre
	so = "Mac" or "Pc"
	secAlias, secStorePass and secKeypass = About android certification:
	
Folder "Cert" have certificates for release build.

## GRUNT commands:


`grunt serve` server for dev, on app folder

`grunt serve:dist` server of dist folder with compiled files

'grunt serve --mockey=true' server for dev, on app folder but running MOCKEY by default.

`grunt run-mockey` server for data mockup on dev mode

`grunt start-mockey` async

`grunt kill-mockey`

`grunt e (== grunt emulate-android)` open in your emulation (if you have some AVD) with this app

`grunt a` open in your mobile android if it connected to your machine

`grunt aw` same the last one, but with [weinre](http://people.apache.org/~pmuellr/weinre-docs/latest) for debug in older devices (< 4.4) (it's a good one)

`grunt android-release` makes a new release on "dist/X.X.X" folder (version included).


------

For test services you can use [Jmeter](http://jmeter.apache.org/download_jmeter.cgi) with these plugins: [JMeterPlugins-Standard, JMeterPlugins-Extras, JMeterPlugins-ExtrasLibs](http://jmeter-plugins.org/downloads/all/)

After put the plugins on jmeter folder, you can open glow-jmeter.xml with jmeter and test the services
