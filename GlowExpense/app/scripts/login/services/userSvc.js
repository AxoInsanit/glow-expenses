'use strict';

angular.module('Login').factory('UserSvc', ['$resource', 'loginUrlMockWeb', '$timeout',
    function($resource, loginUrlMockWeb, $timeout) {


    return $resource( loginUrlMockWeb, {}, {} );

  //  return $resource( loginUrlMockWeb, {}, {} );

}]);
