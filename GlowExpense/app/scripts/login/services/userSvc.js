'use strict';

angular.module('Login').factory('UserSvc', ['$resource', function($resource) {

    return $resource( 'https://esb.dev.corp.globant.com/system/login', {}, {} );

}]);
