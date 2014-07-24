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
    //,'Login'
    ,'Expenses'
    ,'infinite-scroll'
    ,'InvoiceExpenseImage'
    , 'Api'
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
            name: '/invoice-expense-image',
            params: {
                templateUrl: 'scripts/invoice_expense_image/views/invoice-image-details.html',
                controller: 'InvoiceImageCtrl'
            }
        });
        
        routes.push({
            name: '/add-expense',
            params: {
                templateUrl: 'scripts/expenses/views/add-expense.html',
                controller: 'AddExpenseCtrl'
            }
        });

        routes.push({
            name: '/edit-expense',
            params: {
                templateUrl: 'scripts/expenses/views/editExpense.html',
                controller: 'EditExpenseCtrl'
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

    }])

    .run(['currenciesRepositorySvc', 'currenciesSvc', function(currenciesRepositorySvc, currenciesSvc) {
        currenciesRepositorySvc.getCurrencies().$promise.then(function (result) {
            currenciesSvc.set(result.currencies);
        });
    }]);



