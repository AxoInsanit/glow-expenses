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
    ,'Expenses'
    // yo:ngMainModules
];


angular.module('app', _mainModules )
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
        /*
        routes.push({
            name: '/expenses',
            params: {
                templateUrl: 'scripts/expenses/views/expenses.html',
                controller: 'ExpensesCtrl'
            }
        });
        */
// yo:ngRoutes

        routes.forEach(function(route){
            $routeProvider.when(route.name, route.params);
        });
    });