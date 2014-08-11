'use strict';

angular.module('Api', [])
    .config(function () {})
    .constant('baseUrl', 'https://esb.dev.corp.globant.com')
    .constant('baseUrlMockeyWeb', 'http://10.0.3.2:8080')
    .constant('baseUrlMockeyEmulator', 'http://10.0.3.2:8080')

    .constant('loginUrl', '/service/login')
    .constant('expensesUrl', '/service/expense/:image')
    .constant('currenciesUrl', '/service/currencies')
    .constant('expenseTypesUrl', '/service/expenseTypes')
    .constant('reportsUrl', '/service/expense/report')
    .constant('projectsUrl', '/service/expense/project')

    .constant('expensesPath', '/expenses')
    .constant('reportsPath', '/reports');