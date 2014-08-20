'use strict';

angular.module('Reports').factory('reportExpensesRepositorySvc', ['$resource', 'baseUrlMockeyWeb', 'reportExpensesUrl',
    'reportsSharingSvc', 'localStorageSvc', 'sessionToken',
    function($resource, baseUrlMockeyWeb, reportExpensesUrl, localStorageSvc, sessionToken) {

        return $resource(baseUrlMockeyWeb + reportExpensesUrl, //+ '/?token='+ localStorageSvc.getItem(sessionToken), {}, {
            {},
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