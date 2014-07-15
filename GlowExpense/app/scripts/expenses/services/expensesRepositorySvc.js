'use strict';

angular.module('Expenses').factory('expensesRepositorySvc', ['$resource', 'expensesUrlMockWeb', 'expenseSvc',
    function($resource, expensesUrlMockWeb, expenseSvc) {

        function resource(scope) {
            return $resource( expensesUrlMockWeb, {}, {
                query: {
                    method: 'GET',
                    isArray: true,
                    transformResponse: function (result) {
                        var wrappedExpenses = angular.fromJson(result);
                        var expenses = [];

                        wrappedExpenses.forEach(function (item) {
                            expenses.push(expenseSvc.getExpense(scope, item));
                        });
                        return expenses;
                    }
                }
            });
        }

        return {
            resource: resource
        };
    }]);

