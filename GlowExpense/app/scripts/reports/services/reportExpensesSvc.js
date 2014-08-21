'use strict';

angular.module('Expenses').factory('reportExpensesSvc', ['$resource', 'baseUrlMockeyWeb', 'expensesUrl', 'reportsSharingSvc',
    function($resource, baseUrlMockeyWeb, expensesUrl, reportsSharingSvc) {
        var reportId = reportsSharingSvc.getReport().expenseReportId;
        //return $resource(baseUrlMockeyWeb + expensesUrl + '/?token='+ localStorage.getItem('session-token') +'&expenseReportId=' + reportId, {}, {
        return $resource(baseUrlMockeyWeb + expensesUrl +'&expenseReportId=' + reportId, {}, {
                'getExpenses': {
                    'method': 'GET',
                    'isArray': false
                },
                'saveExpense': {
                    'method': 'POST'
                },
                'deleteExpense': {
                    'method': 'DELETE'
                }
            }
        );
    }
]);