'use strict';

angular.module('Expenses')
    .factory('expensesBufferingSvc', ['$q', 'expensesRepositorySvc', 'expenseSvc', 'localStorageSvc', 'sessionToken',
        function($q, expensesRepositorySvc, expenseSvc, localStorageSvc, sessionToken) {

    var expensesBuffer = [];
    var resultExpenses = [];

    function getExpenses(reportId) {
        var deferred = $q.defer();

        function getExpensesSuccess(response) {ç
            expensesBuffer = response.expenses.map(function(item) {
                return expenseSvc.getExpense(item);
            });

            expensesBuffer = expensesBuffer.splice(0, 4);
            deferred.resolve(expensesBuffer);
        }

        function getExpensesError(){
            deferred.reject();
        }

        expensesRepositorySvc.getExpenses(
            {
               'token': localStorageSvc.getItem(sessionToken),
               'expenseReportId': reportId
            },
            getExpensesSuccess,
            getExpensesError
        );

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