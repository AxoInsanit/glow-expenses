'use strict';

angular.module('Expenses').factory('expensesRepositorySvc',

    function($resource, baseUrlMockeyWeb, expensesUrl) {


        return $resource(baseUrlMockeyWeb + expensesUrl + '?token=:token' ,
            {
                token: 'token'
            },
            {
                'getExpenses': {
                    'method': 'GET',
                    'isArray': false
                },
                'createExpense': {
                    'method': 'POST'
                },
                'saveExpense': {
                    'method': 'PUT'
                },
                'deleteExpense': {
                    'method': 'DELETE'
                }
            }
        );
    }
);
