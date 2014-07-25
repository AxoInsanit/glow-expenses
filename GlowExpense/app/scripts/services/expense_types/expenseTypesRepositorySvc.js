'use strict';

angular.module('Services').factory('expenseTypesRepositorySvc', ['$resource', 'baseUrlMockeyWeb', 'expenseTypesUrl',
    function($resource, baseUrlMockeyWeb, expenseTypesUrl) {

        return $resource( baseUrlMockeyWeb + expenseTypesUrl, {}, {
            getExpenseTypes: {
                method:'GET',
                isArray:false
            }
        } );
    }
]);

