'use strict';
 
angular.module('Expenses').factory('editExpenseSvc', ['$resource', 'editExpensesUrlMockEmulateWebMocky',
    function($resource, editExpensesUrlMockEmulateWebMocky) {
      return $resource( editExpensesUrlMockEmulateWebMocky , {}, {
        save : { method: "POST" }
      })
    }
]);