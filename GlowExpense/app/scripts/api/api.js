'use strict';

var setupEnvironment = function ( environment ) {
    
    var url = '';
    
    switch( environment ) {
        case 'production': 
            url = 'http://esb.dev.corp.globant.com:8080';
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
    .constant( 'baseUrlMockeyWeb', setupEnvironment('emulation'))   
    .constant('loginUrl', '/system/login')
    .constant('expensesUrl', '/expense')
    .constant('currenciesUrl', '/currency')
    .constant('expenseTypesUrl', '/expenseTypes')
    .constant('reportsUrl', '/expense/report')
    .constant('projectsUrl', '/project')
    .constant('imagesUrl', '/image')
    .constant('reportExpensesUrl', '/expense/report/expenses')

    .constant('expensesPath', '/expenses')
    .constant('reportsPath', '/reports')
    .constant('expensePath', '/expense');
