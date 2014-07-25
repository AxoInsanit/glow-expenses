'use strict';

angular.module('Login').factory('UserSvc', ['$resource', 'baseUrlMockeyEmulator', 'loginUrl',
    function($resource, baseUrlMockeyEmulator, loginUrl) {
        return $resource( baseUrlMockeyEmulator + loginUrl, {}, {
            login : { method: "POST" }
        });
    }
]);
