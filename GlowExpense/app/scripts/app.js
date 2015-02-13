'use strict';

var isSafari = /constructor/i.test(window.HTMLElement);
if (isSafari) {
    var file = location.pathname.split( '/' ).pop();

    var link = document.createElement( 'link' );
    link.href = file.substr( 0, file.lastIndexOf( '.' ) ) + 'styles/safari.css';
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.media = 'screen,print';

    document.getElementsByTagName( 'head' )[0].appendChild( link );
}



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
    // yo:ngMainModules
    ,'ui.bootstrap'
];

angular.module('app', _mainModules )
    .config(function($routeProvider, $httpProvider, $compileProvider, sessionToken){
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
            name: '/invoice-expense-image/:expenseId',
            params: {
                templateUrl: 'scripts/invoice_expense_image/views/invoice-image-details.html',
                controller: 'InvoiceImageCtrl'
            }
        });

        routes.push({
            name: '/report-details/:reportId/expense',
            params: {
                templateUrl: 'scripts/expenses/views/add-edit-expense.html',
                controller: 'AddExpenseCtrl'
            }
        });

        routes.push({
            name: '/expense/:id',
            params: {
                templateUrl: 'scripts/expenses/views/add-edit-expense.html',
                controller: 'EditExpenseCtrl'
            }
        });

        routes.push({
            name: '/expense/:id/:imageModal',
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
            name: '/report',
            params: {
                templateUrl: 'scripts/reports/views/create-edit-report.html',
                controller: 'CreateEditReportCtrl'
            }
        });

        routes.push({
            name: '/report/:id',
            params: {
                templateUrl: 'scripts/reports/views/create-edit-report.html',
                controller: 'CreateEditReportCtrl'
            }
        });

        routes.push({
            name: '/report-details/:id',
            params: {
                templateUrl: 'scripts/reports/views/report-details.html',
                controller: 'ReportDetailsCtrl'
            }
        });

        routes.push({
            name: '/report-details/:reportId/expense/:expenseId',
            params: {
                templateUrl: 'scripts/reports/views/report-details-expense.html',
                controller: 'EditReportExpenseCtrl'
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
            notificationChannel,
            localStorageSvc;

        $httpProvider.interceptors.push(['$q', '$injector', '$location', function($q, $injector, $location) {
            return {
                'response': function(response) {
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
                },

                'responseError': function(response) {
                    // get $http via $injector because of circular dependency problem
                    $http = $http || $injector.get('$http');

                    // don't send notification until all requests are complete
                    if ($http.pendingRequests.length < 1) {
                        // get requestNotificationChannel via $injector because of circular dependency problem
                        notificationChannel = notificationChannel || $injector.get('requestNotificationChannelSvc');
                        // send a notification requests are complete
                        notificationChannel.requestEnded();
                    }

                    // check if token expired
                    if (response.status === 401) {
                      localStorageSvc = localStorageSvc || $injector.get('localStorageSvc');
                      localStorageSvc.removeItem(sessionToken);
                      $location.path('/');
                    }

                    return $q.reject(response);
                }
            };
        }]);

        // avoid unsafe prefix on device image's sources
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content):|data:image\//);
    })
    .run(function ($rootScope, $window) {

        // Scroll to the top of the window, on every route change
        //  This fix the issue when changing the view, the next view, it's already scrolled
        var w = angular.element($window);

        $rootScope.$on('$routeChangeStart', function() {
            console.log('Change route!', w.scrollTop(0));
        });
    })
    .constant('serverErrorMsg','Server error!')
    .constant('sessionToken', 'session-token')
    .constant('infiniteScrollEnabled', false);
