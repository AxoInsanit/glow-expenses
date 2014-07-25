'use strict';

<<<<<<< HEAD
angular.module('Login').factory('UserSvc', ['$resource', 'baseUrlMockeyEmulator', 'loginUrl',
    function($resource, baseUrlMockeyEmulator, loginUrl) {
        return $resource( baseUrlMockeyEmulator + loginUrl, {}, {
            login : { method: "POST" }
=======
angular.module('Login').factory('UserSvc', ['$resource', 'baseUrlMockeyWeb', 'loginUrl',
    function($resource, baseUrlMockeyWeb, loginUrl) {
        return $resource( baseUrlMockeyWeb + loginUrl, {}, {
            login : { method: 'POST' }
>>>>>>> 3836c640e4a863d12025faf656dd2f0fa385ab1e
        });
    }
]);
