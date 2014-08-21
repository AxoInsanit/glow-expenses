'use strict';

angular.module('Api', [])
    .config(function () {})
    .constant('baseUrl', 'https://esb.dev.corp.globant.com')
    .constant('baseUrlMockeyWeb', 'http://127.0.0.1:8080')
    .constant('baseUrlMockeyEmulator', 'http://10.0.3.2:8080')

    .constant('loginUrl', '/system/login')
    .constant('expensesUrl', '/expense/:image')
    .constant('currenciesUrl', '/currencies')
    .constant('expenseTypesUrl', '/expenseTypes')
    .constant('reportsUrl', '/expense/report')
    .constant('projectsUrl', '/project')
    .constant('imagesUrl', '/image')
    .constant('reportExpensesUrl', '/expense/report/expenses')

    .constant('expensesPath', '/expenses')
    .constant('reportsPath', '/reports');