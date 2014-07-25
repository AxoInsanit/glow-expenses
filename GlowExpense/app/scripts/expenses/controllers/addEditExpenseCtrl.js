'use strict';

angular.module('Expenses')
    .controller('AddEditExpenseCtrl', ['$scope', '$location', 'expensesRepositorySvc', 'addExpenseErrorMsg',
        'currenciesSvc', 'expenseTypesSvc',

        function ($scope, $location, expensesRepositorySvc, addExpenseErrorMsg, currenciesSvc, expenseTypesSvc) {

            $scope.errorMessage = addExpenseErrorMsg;
            $scope.showErrorMessage = false;
            $scope.imageSelectedPath = '';

            $scope.currencies = currenciesSvc.get();

            $scope.expenseTypes = expenseTypesSvc.get();

            $scope.addOrEdit = function(form, expense) {
                function onSuccess() {
                    $scope.showErrorMessage = false;
                    $location.path('/expenses');
                }

                function onFail() {
                    $scope.showErrorMessage = true;
                }

                if(form.$valid)
                {
                    expense.date = expense.date || new Date();
                    expensesRepositorySvc.saveExpense(expense, onSuccess, onFail);
                }
                else
                {
                    $scope.showErrorMessage = true;
                }
            };

        }
]);