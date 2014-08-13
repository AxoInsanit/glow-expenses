'use strict';

angular.module('Expenses')
    .factory('expensesBufferingSvc', ['expensesRepositorySvc','$q', 'expenseSvc',
        function(expensesRepositorySvc, $q, expenseSvc) {

    var expensesBuffer = [];
    var resultExpenses = [];

    function getExpenses() {
        var deferred = $q.defer();
        
        expensesRepositorySvc.getExpenses().$promise.then(function (result) {
            expensesBuffer = result.expenses.map(function(item){
                return expenseSvc.getExpense(item);
            });

            expensesBuffer = expensesBuffer.splice(0, 4);

            deferred.resolve(expensesBuffer);

        });

        return deferred.promise;
    }

    function getMoreExpenses () {

        var deferred = $q.defer();

        if (expensesBuffer.length > 0){
            resultExpenses = expensesBuffer.splice(0, 5);
            deferred.resolve(resultExpenses);
        } else {
            getExpenses().then(function(result){
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