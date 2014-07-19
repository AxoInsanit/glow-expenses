'use strict';

angular.module('Expenses')
    .factory('expensesBufferingSvc', ['expensesRepositorySvc','$q', 'expenseSvc',
        function(expensesRepositorySvc, $q, expenseSvc) {

    var expensesBuffer = [];
    var resultExpenses = [];

    function getExpenses(scope) {
        var deferred = $q.defer();

        expensesRepositorySvc.getExpenses().$promise.then(function (result) {

            expensesBuffer = result.expenses.map(function(item){
                return expenseSvc.getExpense(scope, item);
            });

            expensesBuffer = expensesBuffer.splice(0, 3);

            deferred.resolve(expensesBuffer);

        });

        return deferred.promise;
    }

    function getMoreExpenses (scope) {

        var deferred = $q.defer();

        if (expensesBuffer.length > 0){
            resultExpenses = expensesBuffer.splice(0, 5);
            deferred.resolve(resultExpenses);
        } else {
            getExpenses(scope).then(function(result){
                deferred.resolve(result);
            });
        }

        return deferred.promise;
    }

    return {
        getExpenses: getExpenses,
        getMoreExpenses: getMoreExpenses
    };
}]);