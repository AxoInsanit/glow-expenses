'use strict';

angular.module('Expenses')
    .controller('AddEditExpenseCtrl', ['$scope', '$location', 'expensesRepositorySvc', 'addExpenseErrorMsg', '$modal',
        'currenciesSvc', 'expenseTypesSvc',

        function ($scope, $location, expensesRepositorySvc, addExpenseErrorMsg, $modal, currenciesSvc, expenseTypesSvc) {

            $scope.errorMessage = addExpenseErrorMsg;
            $scope.showErrorMessage = false;

            $scope.currencies = currenciesSvc.get();

            $scope.expenseTypes = expenseTypesSvc.get();

            $scope.createReport = function() {
                $location.path('/create-report');
            };

            $scope.expenseTypeModal = function($event) {
                var modalInstance = $modal.open({
                  templateUrl: 'expenseTypeModal',
                  controller: expenseTypeModalCtrl,
                  resolve: {
                    expenseTypes: function () {
                      return {"types": $scope.expenseTypes,"target":event.target};
                    }
                  }
                });
            };

            $scope.expenseCurrencyModal = function($event) {
                var modalInstance = $modal.open({
                  templateUrl: 'expenseCurrencyModal',
                  controller: expenseCurrencyModalCtrl,
                  resolve: {
                    currencies: function () {
                      return {"types": $scope.currencies,"target":event.target};
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