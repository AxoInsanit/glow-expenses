'use strict';

var _mainModules = [
    'Services'
  //  ,'Filters'
    ,'Directives'
    ,'ngRoute'
    ,'ngResource'
  //  ,'ngSanitize'
  //  ,'ngCookies'
    ,'ngAnimate'
    ,'ngTouch'
  //  ,'ngMock'
  //  ,'ngLocale'
    ,'Header'
    ,'Login'
    ,'Expenses'
    ,'Reports'
    ,'infinite-scroll'
    ,'InvoiceExpenseImage'
    , 'Api'
    , 'Modals'
    , 'Partials'
    , 'pasvaz.bindonce'

    // yo:ngMainModules
    ,'ui.bootstrap'
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
                templateUrl: 'scripts/expenses/views/add-edit-expense.html',
                controller: 'AddExpenseCtrl'
            }
        });

        routes.push({
            name: '/edit-expense',
            params: {
                templateUrl: 'scripts/expenses/views/add-edit-expense.html',
                controller: 'EditExpenseCtrl'
            }
        });

        routes.push({
            name: '/reports',
            params: {
                templateUrl: 'scripts/reports/views/reports-list.html',
                controller: 'ReportsListCtrl'
            }
        });

        routes.push({
            name: '/create-report',
            params: {
                templateUrl: 'scripts/reports/views/create-edit-report.html',
                controller: 'CreateEditReportCtrl'
            }
        });

        routes.push({
            name: '/edit-report',
            params: {
                templateUrl: 'scripts/reports/views/create-edit-report.html',
                controller: 'CreateEditReportCtrl'
            }
        });

        routes.push({
            name: '/report-details',
            params: {
                templateUrl: 'scripts/reports/views/report-details.html',
                controller: 'ReportDetailsCtrl'
            }
        });

        routes.push({
            name: '/settings',
            params: {
                templateUrl: 'scripts/expenses/views/settings.html',
                controller: 'LoginCtrl'
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
    .constant('serverErrorMsg','Server error!')

    .run(['currenciesRepositorySvc', 'currenciesSvc',
        function(currenciesRepositorySvc, currenciesSvc) {
            currenciesRepositorySvc.getCurrencies().$promise.then(function (result) {
                currenciesSvc.set(result.currencies);
            });

    }]);



