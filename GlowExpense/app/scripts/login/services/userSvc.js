'use strict';

angular.module('Login').factory('UserSvc', ['$resource', 'loginUrlMockWeb',
    function($resource, loginUrlMockWeb) {
        return $resource( loginUrlMockWeb, {}, {} );

}]);
