'use strict';

angular.module('Expenses').factory('ExpensesSvc', ['$resource', function($resource) {

    return $resource( 'https://esb.dev.corp.globant.com/expense', {}, {} );

}]);

