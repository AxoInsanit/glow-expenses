'use strict';

angular.module('Login').factory('UserSvc', ['$resource', 'loginUrlMockEmulateWebMocky',
    function($resource, loginUrlMockEmulateWebMocky) {
        return $resource( loginUrlMockEmulateWebMocky, {}, {} );

    }
]);
