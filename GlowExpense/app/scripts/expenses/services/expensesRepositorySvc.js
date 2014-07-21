'use strict';

angular.module('Expenses').factory('expensesRepositorySvc', ['$resource', 'expensesUrlMockWeb',
    function($resource, expensesUrlMockWeb) {

        return $resource(expensesUrlMockWeb, {image: '@image' }, {
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