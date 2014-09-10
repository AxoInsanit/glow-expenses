'use strict';

angular.module('Api', [])
    .config(function () {})
    //.constant('baseUrl', 'https://esb.dev.corp.globant.com')
    //our network


    // .constant('baseUrlMockeyWeb', 'http://10.10.10.123:8080')

    //.constant('baseUrlMockeyWeb', 'http://10.0.3.2:8080')

    //public network
    // .constant('baseUrlMockeyWeb', 'http://92.247.83.122:7000')
    //localhost

    .constant('baseUrlMockeyWeb', 'http://127.0.0.1:8080')

    //.constant('baseUrlMockeyWeb', 'http://127.0.0.1:7000')

    //   .constant('baseUrlMockeyEmulator', 'http://10.0.3.2:8080')

  //  .constant('baseUrlMockeyWeb', 'http://10.10.10.123:8080')
    //public network
    // .constant('baseUrlMockeyWeb', 'http://92.247.83.122:7000')
    //localhost
    // .constant('baseUrlMockeyWeb', 'http://127.0.0.1:8080')
    // .constant('baseUrlMockeyEmulator', 'http://10.0.3.2:8080')

    // .constant('baseUrlMockeyIOS', 'localhost:8080')
    // .constant('baseUrlMockeyWeb', 'http://127.0.0.1:7000')
    //globant end point
    // .constant('baseUrlMockeyWeb', 'http://esb.dev.corp.globant.com:8080') 

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
