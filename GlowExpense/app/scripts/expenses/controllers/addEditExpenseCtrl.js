'use strict';

angular.module('Expenses')
.controller('AddEditExpenseCtrl',
['$scope', '$routeParams', 'addExpenseErrorMsg',  'currenciesSvc', 'contableCodesSvc', 'currencySelectDialogSvc', 'contableCodeSelectDialogSvc',
function ($scope, $routeParams, addExpenseErrorMsg, currenciesSvc, contableCodesSvc, currencySelectDialogSvc, contableSelectDialogSvc) {

    $scope.errorMessage = addExpenseErrorMsg;

    $scope.currencies = currenciesSvc.get();

    $scope.contableCodes = contableCodesSvc.get();

    $scope.selectCurrency = function( currency ) {
        currencySelectDialogSvc.open(currency, $scope.currencies).then(function(selectedCurrency){
            $scope.expense.currency = selectedCurrency;
        });
    };

    $scope.selectContableCode = function( contableCode ) {
        contableSelectDialogSvc.open(contableCode, $scope.contableCodes).then(function(selectedContableCode){
            $scope.expense.contableCode = selectedContableCode;
        });
    };
}]);
