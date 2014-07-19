'use strict';

angular.module('Services').factory('currenciesRepositorySvc', ['$resource', 'currenciesUrlMockWeb',
    function($resource, currenciesUrlMockWeb) {

        return $resource( currenciesUrlMockWeb, {}, {
            getCurrencies: {
                method:'GET',
                isArray:false
            }
        } );
    }
]);

