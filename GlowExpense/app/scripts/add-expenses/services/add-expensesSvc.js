'use strict';

angular.module('AddExpenses').factory('AddExpensesSvc', ['$resource', 'addExpensesUrlMockEmulateWebMocky', function($resource, addExpensesUrlMockEmulateWebMocky) {
    return $resource( addExpensesUrlMockEmulateWebMocky, {}, {} );

}]);
