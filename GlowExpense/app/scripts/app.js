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
    ,'Directives'
    ,'ui.router'
    ,'ngAnimate'
    ,'ngTouch'
    ,'Layouts'
    ,'Login'
    ,'Expenses'
    ,'Projects'
    ,'Reports'
    ,'infinite-scroll'
    ,'Api'
    ,'Modals'
    ,'ui.bootstrap'
];

angular.module('app', _mainModules )
    .config(function($urlRouterProvider, $httpProvider, $compileProvider, sessionToken, $stateProvider){
        $stateProvider
            .state('emptyLayout', {
                abstract: true,
                templateUrl: 'scripts/layouts/views/empty.html'
            })
            .state('detailsLayout', {
                abstract: true,
                templateUrl: 'scripts/layouts/views/details.html'
            })
            .state('editDetailsLayout', {
                abstract: true,
                controller: 'EditDetailsCtrl',
                templateUrl: 'scripts/layouts/views/editDetails.html'
            })
            .state('homeLayout', {
                abstract: true,
                controller: 'HomeCtrl',
                templateUrl: 'scripts/layouts/views/home.html'
            })
            .state('login', {
                parent: 'emptyLayout',
                url: '/login',
                templateUrl: 'scripts/login/views/login.html',
                controller: 'LoginCtrl'
            })
            .state('home', {
                parent: 'homeLayout',
                url: '/home?view',
                views: {
                    expenses: {
                        templateUrl: 'scripts/expenses/views/expensesList.html',
                        controller: 'ExpensesListCtrl'
                    },
                    reports: {
                        templateUrl: 'scripts/reports/views/reportsList.html',
                        controller: 'ReportsListCtrl'
                    }
                }
            })
            .state('editExpense', {
                parent: 'detailsLayout',
                url: '/expenses/:expenseId?imageModal',
                controller: 'ExpenseFormCtrl',
                templateUrl: 'scripts/expenses/views/expenseForm.html'
            })
            .state('viewExpenseImage', {
                parent: 'detailsLayout',
                url: '/expense/:expenseId/:reportId/image',
                controller: 'ViewExpenseImageCtrl',
                templateUrl: 'scripts/expenses/views/viewExpenseImage.html'
            })
            .state('viewExpenseLocalImage', {
                parent: 'detailsLayout',
                url: '/expense/:expenseId/:reportId/:localImagePath',
                controller: 'ViewExpenseImageCtrl',
                templateUrl: 'scripts/expenses/views/viewExpenseImage.html'
            })
            .state('addReportExpense', {
                parent: 'detailsLayout',
                url: '/reports/:reportId/expenses',
                controller: 'ExpenseFormCtrl',
                templateUrl: 'scripts/expenses/views/expenseForm.html'
            })
            .state('editReportExpense', {
                parent: 'detailsLayout',
                url: '/reports/:reportId/expenses/:expenseId?imageModal',
                controller: 'ExpenseFormCtrl',
                templateUrl: 'scripts/expenses/views/expenseForm.html'
            })
            .state('newReport', {
                parent: 'detailsLayout',
                url: '/reports/new',
                controller: 'ReportFormCtrl',
                templateUrl: 'scripts/reports/views/reportForm.html'
            })
            .state('viewReport', {
                parent: 'editDetailsLayout',
                url: '/reports/:reportId',
                controller: 'ViewReportCtrl',
                templateUrl: 'scripts/reports/views/viewReport.html'
            })
            .state('editReport', {
                parent: 'detailsLayout',
                url: '/reports/:reportId/edit',
                controller: 'ReportFormCtrl',
                templateUrl: 'scripts/reports/views/reportForm.html'
            })
            .state('addExpensesToReport', {
                parent: 'detailsLayout',
                url: '/reports/:reportId/addExpenses',
                controller: 'ExpensesListCtrl',
                templateUrl: 'scripts/expenses/views/expensesList.html'
            });

        $urlRouterProvider.otherwise('/login');

        var $http,
            notificationChannel,
            requestCount = 0;

        $httpProvider.interceptors.push(['$q', '$injector', '$rootScope', function($q, $injector, $rootScope) {
            return {
                'request': function (request) {
                    // If no request ongoing, then broadcast start event
                    if(!requestCount) {
                        notificationChannel = notificationChannel || $injector.get('requestNotificationChannelSvc');
                        notificationChannel.requestStarted();
                    }

                    requestCount += 1;

                    return request;
                },
                'response': function(response) {
                    // get $http via $injector because of circular dependency problem
                    $http = $http || $injector.get('$http');

                    // don't send notification until all requests are complete
                    requestCount -= 1;
                    if (requestCount === 0) {
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

                    requestCount -= 1;
                    // don't send notification until all requests are complete
                    if (requestCount === 0) {
                        // get requestNotificationChannel via $injector because of circular dependency problem
                        notificationChannel = notificationChannel || $injector.get('requestNotificationChannelSvc');
                        // send a notification requests are complete
                        notificationChannel.requestEnded();
                    }
                    // check if token expired
                    if (response.status === 401 && response.data === 'Invalid Token. Message payload is of type: String') {
                        $rootScope.$broadcast('global::signOutExpired');
                    }

                    return $q.reject(response);
                }
            };
        }]);

        // avoid unsafe prefix on device image's sources
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content):|data:image\//);
    })
    .run(function ($rootScope, $window, $state, transitionService, errorDialogSvc, confirmExitDialogSvc) {
        // Scroll to the top of the window, on every route change
        //  This fix the issue when changing the view, the next view, it's already scrolled
        $rootScope.$on('$stateChangeStart', function() {
            $window.scrollTo(0, 0);
        });

        $rootScope.$on('global::signOut', function () {
            transitionService.go({
                name: 'login',
                direction: 'up'
            });
        });
        $rootScope.$on('global::signOutExpired', function () {
            transitionService.go({
                name: 'login',
                direction: 'up'
            });
            errorDialogSvc.open('Your session expired');
        });
        document.addEventListener('deviceready', function () {
            if (window.plugins && window.plugins.orientationLock) {
                window.plugins.orientationLock.lock('portrait');
            }

            document.addEventListener('backbutton', function () {
                var modalIsOpen = !!document.getElementById('modalSignOut') || !!document.getElementById('modalExitDialog');
                if (($state.current.name === 'home' || $state.current.name === 'login') && !modalIsOpen) {
                    confirmExitDialogSvc.open('exit');
                }
            }, false);

        });

    })
    .constant('serverErrorMsg','Server error!')
    .constant('sessionToken', 'session-token')
    .constant('infiniteScrollEnabled', false);
