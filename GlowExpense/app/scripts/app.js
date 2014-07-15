'use strict';

var _mainModules = [
    'Services'
  //  ,'Filters'
    ,'Directives'
    ,'ngRoute'
    ,'ngResource'
  //  ,'ngSanitize'
  //  ,'ngCookies'
  //  ,'ngAnimate'
  //  ,'ngTouch'
  //  ,'ngMock'
  //  ,'ngLocale'
    ,'Login'
    ,'Expenses'
    ,'AddExpenses'
    ,'infinite-scroll'

    // yo:ngMainModules
];

angular.module('app', _mainModules )
    .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
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

        routes.push({
            name: '/expenses',
            params: {
                templateUrl: 'scripts/expenses/views/expenses.html',
                controller: 'ExpensesListCtrl'
            }
        });

        routes.push({
            name: '/add-image',
            params: {
                templateUrl: 'scripts/add-image/views/add-image.html',
                controller: 'AddImageCtrl'
            }
        });
        
        routes.push({
            name: '/addexpenses',
            params: {
                templateUrl: 'scripts/add-expenses/views/add-expenses.html',
                controller: 'AddExpensesCtrl'
            }
        });

        routes.push({
            name: '/sendexpenses',
            params: {
                templateUrl: 'scripts/expenses/views/send-expenses-report.html',
                controller: 'ExpensesCtrl'
            }
        });

        
// yo:ngRoutes

        routes.forEach(function(route){
            $routeProvider.when(route.name, route.params);
        });

        var $http,
            interceptor = ['$q', '$injector', function ($q, $injector) {
                var notificationChannel;

                function success(response) {
                    // get $http via $injector because of circular dependency problem
                    $http = $http || $injector.get('$http');
                    // don't send notification until all requests are complete
                    if ($http.pendingRequests.length < 1) {
                        // get requestNotificationChannel via $injector because of circular dependency problem
                        notificationChannel = notificationChannel || $injector.get('requestNotificationChannelSvc');
                        // send a notification requests are complete
                        notificationChannel.requestEnded();
                    }
                    return response;
                }

                function error(response) {
                    // get $http via $injector because of circular dependency problem
                    $http = $http || $injector.get('$http');
                    // don't send notification until all requests are complete
                    if ($http.pendingRequests.length < 1) {
                        // get requestNotificationChannel via $injector because of circular dependency problem
                        notificationChannel = notificationChannel || $injector.get('requestNotificationChannelSvc');
                        // send a notification requests are complete
                        notificationChannel.requestEnded();
                    }
                    return $q.reject(response);
                }

                return function (promise) {
                    // get requestNotificationChannel via $injector because of circular dependency problem
                    notificationChannel = notificationChannel || $injector.get('requestNotificationChannelSvc');
                    // send a notification requests are complete
                    notificationChannel.requestStarted();
                    return promise.then(success, error);
                };
            }];

        $httpProvider.responseInterceptors.push(interceptor);

    }]);