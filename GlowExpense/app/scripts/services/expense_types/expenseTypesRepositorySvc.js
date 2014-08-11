'use strict';

angular.module('Services').factory('expenseTypesRepositorySvc', ['$resource', 'baseUrlMockeyEmulator', 'expenseTypesUrl',
    function($resource, baseUrlMockeyEmulator, expenseTypesUrl) {

        return $resource( baseUrlMockeyEmulator + expenseTypesUrl, {}, {
            getExpenseTypes: {
                method:'GET',
                isArray:false
            }
        } );
    }
]);

