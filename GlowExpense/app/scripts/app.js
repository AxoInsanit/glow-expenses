'use strict';

var _mainModules = [
    'Services'
    ,'Filters'
    ,'Directives'
    ,'ngRoute'
    ,'ngTouch'
    ,'Login'
    // yo:ngMainModules
];


angular.module('GlowExpense', _mainModules )
    .config( function($routeProvider){
        //redirect any invalid hash to /home
        $routeProvider.otherwise({
            redirectTo: '/'
        });

        var routes = [];

        routes.push({
            name: '/-login',
            params: {
                templateUrl: 'scripts/login/views/login.html',
                controller: 'LoginCtrl'
            }
        });
        
// yo:ngRoutes

        routes.forEach(function(route){
            $routeProvider.when(route.name, route.params);
        });
    });