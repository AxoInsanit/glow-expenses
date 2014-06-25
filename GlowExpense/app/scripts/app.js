'use strict';

var _mainModules = [
    'Services'
  //  ,'Filters'
    ,'Directives'
    ,'ngRoute'
  //  ,'ngResource'
  //  ,'ngSanitize'
  //  ,'ngCookies'
  //  ,'ngAnimate'
  //  ,'ngTouch'
  //  ,'ngMock'
  //  ,'ngLocale'
    ,'Login'
    // yo:ngMainModules
];


angular.module('app1t', _mainModules )
//angular.module('app1t', ['Login', 'ngRoute'] )
    .config( function($routeProvider){
        //redirect any invalid hash to /home
        $routeProvider
           
            .otherwise({
                redirectTo: '/login'
            });
        var routes = [];

        routes.push({
            name: '/login',
            params: {
                templateUrl:  './scripts/login/views/login.html',
                controller: 'LoginCtrl'
            }
        });
        
// yo:ngRoutes

        routes.forEach(function(route){
            $routeProvider.when(route.name, route.params);
        });
    });