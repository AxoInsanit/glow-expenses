'use strict';

angular.module('Expenses').factory('expensesRepositorySvc', ['$resource', 'baseUrlMockeyWeb', 'expensesUrl',
    function($resource, baseUrlMockeyWeb, expensesUrl) {

        return $resource(baseUrlMockeyWeb + expensesUrl, {image: '@image' }, {
                'getExpenses': {
                    'method': 'GET',
                    'isArray': false
                },
                'getImage': {
                    'method': 'GET',
                    'isArray': false
                }
            }
        );
    }
]);