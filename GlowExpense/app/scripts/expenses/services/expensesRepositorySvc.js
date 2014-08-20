'use strict';

angular.module('Expenses').factory('expensesRepositorySvc', ['$resource', 'baseUrlMockeyWeb', 'expensesUrl',
    'localStorageSvc', 'sessionToken',
    function($resource, baseUrlMockeyWeb, expensesUrl, localStorageSvc, sessionToken) {

        return $resource(baseUrlMockeyWeb + expensesUrl + '/?token='+ localStorageSvc.getItem(sessionToken),
            {},
            {
                'getExpenses': {
                    'method': 'GET',
                    'isArray': false
                },
                'getImage': {
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
]);