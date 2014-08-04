'use strict';

angular.module('Expenses')
    .controller('AddEditExpenseCtrl', ['$scope', '$location', 'expensesRepositorySvc', 'addExpenseErrorMsg', '$modal',
        'currenciesSvc', 'expenseTypesSvc',

        function ($scope, $location, expensesRepositorySvc, addExpenseErrorMsg, $modal, currenciesSvc, expenseTypesSvc) {

            $scope.errorMessage = addExpenseErrorMsg;
            $scope.showErrorMessage = false;

            $scope.currencies = currenciesSvc.get();

            $scope.expenseTypes = expenseTypesSvc.get();

            $scope.expenseTypeModal = function() {
                var modalInstance = $modal.open({
                  templateUrl: 'expenseTypeModal',
                  controller: SignOutModalCtrl,
                  size: "sm",
                  resolve: {
                    items: function () {
                      return $scope.items;
                    }
                  }
                });
            };

            $scope.expenseCurrencyModal = function() {
                var modalInstance = $modal.open({
                  templateUrl: 'expenseCurrencyModal',
                  controller: SignOutModalCtrl,
                  size: "sm",
                  resolve: {
                    items: function () {
                      return $scope.items;
                    }
                  }
                });
            };

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