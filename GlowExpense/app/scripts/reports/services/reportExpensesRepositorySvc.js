'use strict';

angular.module('Reports').factory('reportExpensesRepositorySvc', ['$resource', 'baseUrlMockeyWeb', 'reportExpensesUrl',
    function($resource, baseUrlMockeyWeb, reportExpensesUrl) {

        return $resource(baseUrlMockeyWeb + reportExpensesUrl + '?token=:token',
            {
                token: 'token'
            },
            {
                'addExpensesToReport': {
                    'method': 'POST'
                },
                'deleteExpense': {
                    'method': 'DELETE'
                },
                'saveExpensesToReport': {
                    'method': 'PUT'
                }
            }
        );
    }
]);