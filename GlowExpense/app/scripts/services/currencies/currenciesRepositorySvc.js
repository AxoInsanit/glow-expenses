'use strict';

angular.module('Services').factory('currenciesRepositorySvc', ['$resource', 'baseUrlMockeyWeb', 'currenciesUrl',
    function($resource, baseUrlMockeyWeb, currenciesUrl) {

        return $resource( baseUrlMockeyWeb + currenciesUrl, {}, {
            getCurrencies: {
                method:'GET',
                isArray:false
            }
        } );
    }
]);

