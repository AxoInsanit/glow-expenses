'use strict';

angular.module('Expenses').factory('expensesRepositorySvc', ['$resource', 'expensesUrlMockEmulate',
    function($resource, expensesUrlMockEmulate) {

        return $resource(expensesUrlMockEmulate, {image: '@image' }, {
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