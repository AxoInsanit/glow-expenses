'use strict';

angular.module('Expenses')
    .controller('AddEditExpenseCtrl', ['$scope', '$location', 'expensesRepositorySvc', 'addExpenseErrorMsg', '$modal',
        'currenciesSvc', 'reportSharingSvc', 'currencySelectDialogSvc',

        function ($scope, $location, expensesRepositorySvc, addExpenseErrorMsg, $modal, currenciesSvc, reportSharingSvc,
                  currencySelectDialogSvc) {

            $scope.errorMessage = addExpenseErrorMsg;
            $scope.report = reportSharingSvc.getReport();
            $scope.currencies = currenciesSvc.get();

            $scope.selectCurrency = function(currency){
                currencySelectDialogSvc.open(currency, $scope.currencies).then(function(selectedCurrency){
                    $scope.expense.currency = selectedCurrency;
                });
            };
        }
]);