'use strict';

var setupEnvironment = function ( environment ) {

    var url = '';

    switch( environment ) {
        case 'production':
            url = 'https://esb.globant.com';
            break;
        case 'emulation':
            url = 'http://10.0.3.2:8080';
            break;
        case 'localhost':
            url = 'http://127.0.0.1:8080';
            break;
    }

    return url;
};

angular.module('Api', [])
    .config(function () {})
    .constant('baseUrlMockeyWeb', setupEnvironment('production'))
    .constant('loginUrl', '/system/login')
    .constant('expensesUrl', '/expense')
    .constant('currenciesUrl', '/currency')
    .constant('contableCodesUrl', '/contableCode')
    .constant('expenseTypesUrl', '/expenseTypes')
    .constant('reportsUrl', '/expense/report')
    .constant('reportsSendUrl', '/expense/report/send')
    .constant('projectsUrl', '/project')
    .constant('organizationalUnitsUrl', '/organizationalUnit')
    .constant('imagesUrl', '/image')
    .constant('reportExpensesUrl', '/expense/report/expenses')
    .constant('globerUrl', '/glober')
    .constant('expensesPath', '/expenses')
    .constant('reportsPath', '/reports')
    .constant('expensePath', '/expense')
    .constant('getAssignmentsUrl', '/glober/assignments');
