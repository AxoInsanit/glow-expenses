'use strict';

angular.module('Reports').factory('reportExpensesRepositorySvc',
    function($resource, baseUrlMockeyWeb, reportExpensesUrl, expensesDeleteUrl) {

        return $resource(baseUrlMockeyWeb + reportExpensesUrl + '?token=:token',
            {
                token: 'token'
            },
            {
                'addExpensesToReport': {
                    'method': 'POST'
                },
                'deleteExpense': {
                    'method': 'DELETE',
                    'url': baseUrlMockeyWeb + expensesDeleteUrl + '?token=:token'
                },
                'saveExpensesToReport': {
                    'method': 'PUT'
                }
            }
        );
    }
);
