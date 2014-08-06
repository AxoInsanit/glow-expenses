'use strict';

angular.module('Api', [])
    .config(function () {})
    .constant('baseUrl', 'https://esb.dev.corp.globant.com')
    .constant('baseUrlMockeyWeb', 'http://127.0.0.1:8080')
    .constant('baseUrlMockeyEmulator', 'http://10.0.3.2:8080')

    .constant('loginUrl', '/service/login')
    .constant('expensesUrl', '/service/expense/:image')
    .constant('currenciesUrl', '/service/currencies')
    .constant('expenseTypesUrl', '/service/expenseTypes')
    .constant('reportsUrl', '/service/expese/report')
    .constant('projectsUrl', '/service/expese/project');