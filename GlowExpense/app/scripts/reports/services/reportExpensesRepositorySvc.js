'use strict';

angular.module('Reports').factory('reportExpensesRepositorySvc', ['$resource', 'baseUrlMockeyWeb', 'reportExpensesUrl',
    'reportsSharingSvc',
    function($resource, baseUrlMockeyWeb, reportExpensesUrl) {

        return $resource(baseUrlMockeyWeb + reportExpensesUrl, {}, {

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