/**
 * Created by diego.caro on 07/11/2014.
 */
'use strict';

angular.module('Services').factory('contableCodesRepositorySvc', ['$resource', 'baseUrlMockeyWeb', 'contableCodesUrl',
    function($resource, baseUrlMockeyWeb, contableCodesUrl) {

        return $resource( baseUrlMockeyWeb + contableCodesUrl  + '?token=:token' ,
            {
                token: 'token'
            },
            {
                getContableCodes: {
                    method:'GET',
                    isArray:false
                }
            }
        );
    }
]);

