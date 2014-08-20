'use strict';

angular.module('Expenses')
    .controller('AddEditExpenseCtrl', ['$scope', '$location', 'expensesRepositorySvc', 'addExpenseErrorMsg', '$modal',
        'currenciesSvc', 'reportsSharingSvc', 'currencySelectDialogSvc',

        function ($scope, $location, expensesRepositorySvc, addExpenseErrorMsg, $modal, currenciesSvc, reportsSharingSvc,
                  currencySelectDialogSvc) {

            $scope.errorMessage = addExpenseErrorMsg;
            $scope.currencies = currenciesSvc.get();

            $scope.selectCurrency = function(currency){
                currencySelectDialogSvc.open(currency, $scope.currencies).then(function(selectedCurrency){
                    $scope.expense.currency = selectedCurrency;
                });
            };
        }
]);