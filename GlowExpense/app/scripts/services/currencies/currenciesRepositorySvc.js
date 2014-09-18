'use strict';

angular.module('Services').factory('currenciesRepositorySvc', ['$resource', 'baseUrlMockeyWeb', 'currenciesUrl',
    function($resource, baseUrlMockeyWeb, currenciesUrl) {

        return $resource( baseUrlMockeyWeb + currenciesUrl  + '?token=:token' ,
            {
                token: 'token'
            },
            {
                getCurrencies: {
                    method:'GET',
                    isArray:false
                }
            }
        );
    }
]);

