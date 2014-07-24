'use strict';

angular.module('Services').factory('currenciesRepositorySvc', ['$resource', 'baseUrlMockeyEmulator', 'currenciesUrl',
    function($resource, baseUrlMockeyEmulator, currenciesUrl) {

        return $resource( baseUrlMockeyEmulator + currenciesUrl, {}, {
            getCurrencies: {
                method:'GET',
                isArray:false
            }
        } );
    }
]);

