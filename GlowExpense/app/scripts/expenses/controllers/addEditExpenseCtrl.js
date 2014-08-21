'use strict';

angular.module('Expenses')
    .controller('AddEditExpenseCtrl', ['$scope', '$location', 'expensesRepositorySvc', 'addExpenseErrorMsg', '$modal',
        'currenciesSvc', 'reportsSharingSvc', 'currencySelectDialogSvc', 'serverErrorMsg',

        function ($scope, $location, expensesRepositorySvc, addExpenseErrorMsg, $modal, currenciesSvc, reportsSharingSvc,
                  currencySelectDialogSvc, serverErrorMsg) {

            $scope.errorMessage = addExpenseErrorMsg;
            $scope.serverErrorMsg = serverErrorMsg;

            $scope.currencies = currenciesSvc.get();

            $scope.selectCurrency = function(currency){
                //debugger;
                currencySelectDialogSvc.open(currency, $scope.currencies).then(function(selectedCurrency){
                    $scope.expense.currency = selectedCurrency;
                });
            };
        }
]);