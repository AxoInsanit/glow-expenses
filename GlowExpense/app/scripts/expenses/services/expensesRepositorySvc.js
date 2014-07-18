'use strict';

angular.module('Expenses').factory('expensesRepositorySvc', ['$resource', 'expensesUrlMockWeb',
    function($resource, expensesUrlMockWeb) {

            return $resource( expensesUrlMockWeb, {}, {} );
    }]);

