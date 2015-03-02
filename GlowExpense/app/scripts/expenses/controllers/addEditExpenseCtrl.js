'use strict';

angular.module('Expenses')
.controller('AddEditExpenseCtrl', function ($scope, $routeParams, addExpenseErrorMsg, currenciesSvc, contableCodesSvc,
                                            currencySelectDialogSvc, contableCodeSelectDialogSvc) {

    $scope.errorMessage = addExpenseErrorMsg;

    $scope.selectCurrency = function( currency ) {
        currenciesSvc.get().then(function (currencies) {
            currencySelectDialogSvc.open(currency, currencies).then(function(selectedCurrency){
                $scope.expense.currency = selectedCurrency;
            });
        });
    };

    $scope.selectContableCode = function( contableCode ) {
        contableCodesSvc.get().then(function (contableCodes) {
            contableCodeSelectDialogSvc.open(contableCode, contableCodes).then(function(selectedContableCode){
                $scope.expense.contableCode = selectedContableCode;
            });
        });
    };
});
