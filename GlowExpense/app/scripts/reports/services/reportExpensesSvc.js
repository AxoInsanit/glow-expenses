'use strict';

angular.module('Expenses').factory('reportExpensesSvc', ['$resource', 'baseUrlMockeyWeb', 'expensesUrl', 'reportSharingSvc',
    function($resource, baseUrlMockeyWeb, expensesUrl, reportSharingSvc) {
        var reportId = reportSharingSvc.getReport().data.expenseReportId;
        return $resource(baseUrlMockeyWeb + expensesUrl + "/?token="+ localStorage.getItem("session-token") +"&expenseReportId=" + reportId, {}, {
                'getExpenses': {
                    'method': 'GET',
                    'isArray': true
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