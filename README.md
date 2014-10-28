# GLOW - EXPENSES

## INSTALL:

### Prerequisites:
* git
* Android sdk
* nodejs & npm
* cordova cli

### Instalation
* `git clone https://github.com/GlobantMobileStudio/glow-expenses.git`
* `git checkout TitleX`
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







# DEPRECATE this needs to review

# Angular seed

This project is an application skeleton for a typical AngularJS application.

It contains AngularJS libraries, along some AngularJS plugins. It also contains a bunch of preconfigured grunt tasks, so you don't have to worry about build, development server or setting up a test runner.

## How to run the app

```
$ grunt server #It will open a browser tab pointing to http://localhost:9000/  
$ ./mockey.sh
```

## How to run unit tests

```
$ grunt run-unit
```

## How to run e2e tests

```
$ grunt run-e2e #It will open a browser tab poiting to http://localhost:9876  
```

## How to run the build

```
$ grunt build #It will create dist/ directory  
$ grunt server:dist #It will create dist/ directory and open a browser tap poiting to http://localhost:9010 serving dist/ directory  
```

## Wiki
[https://github.com/GlobantMobileStudio/webmobile-basecode/wiki/Angular-Seed---Wiki-Home-Page](https://github.com/GlobantMobileStudio/webmobile-basecode/wiki/Angular-Seed---Wiki-Home-Page)

## v0.2.0
1. JShint
2. CSSLint
3. Unit and e2e tests runner
4. Mockey
5. Compass
6. Environment configurations

## Examples
[The Beatles!](https://github.com/GlobantMobileStudio/webmobile-examples/tree/angular-seed-examples-master)
