'use strict';

angular.module('Login').factory('UserSvc', ['$resource', 'baseUrlMockeyWeb', 'loginUrl',
    function($resource, baseUrlMockeyWeb, loginUrl) {
        return $resource( baseUrlMockeyWeb + loginUrl, {}, {
            login : { method: "POST" }
        });
    }
]);
