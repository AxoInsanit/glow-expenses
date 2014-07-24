'use strict';

/* global Camera: false */
/* global alert: false */

angular.module('Expenses')
    .controller('AddExpenseCtrl', ['$scope', '$location', 'expensesRepositorySvc', 'addExpenseErrorMsg',
        'currenciesSvc', 'expenseTypesSvc', 'cameraSvc',

    function ($scope, $location, expensesRepositorySvc, addExpenseErrorMsg, currenciesSvc, expenseTypesSvc, cameraSvc) {

        $scope.errorMessage = addExpenseErrorMsg;
        $scope.showErrorMessage = false;
        $scope.imageSelectedPath = '';

        $scope.date = new Date();
        $scope.currencies = currenciesSvc.get();

        $scope.expenseTypes = expenseTypesSvc.get();

       $scope.add = function(expense) {
           function onSuccess() {
              $scope.showErrorMessage = false;
              $location.path('/expenses');
            }

            function onFail() {
                $scope.showErrorMessage = true;
            }

           if($scope.expenseForm.$valid)
            {
               expense.date = new Date();
               expensesRepositorySvc.saveExpense(expense, onSuccess, onFail);
            }
            else
            {
                $scope.showErrorMessage = true;
            }
        };

        $scope.takePhoto = function() {
            cameraSvc.takePhoto().then(function(result){
                $scope.imageSelectedPath = result;
            });
        };
    }]);