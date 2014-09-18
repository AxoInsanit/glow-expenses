'use strict';

angular.module('Expenses')
.controller('AddEditExpenseCtrl',
['$scope', '$routeParams', 'addExpenseErrorMsg',  'currenciesSvc', 'currencySelectDialogSvc',
function ($scope, $routeParams, addExpenseErrorMsg, currenciesSvc, currencySelectDialogSvc) {

    $scope.errorMessage = addExpenseErrorMsg;

    $scope.currencies = currenciesSvc.get();
    
    $scope.selectCurrency = function( currency ) {
        currencySelectDialogSvc.open(currency, $scope.currencies).then(function(selectedCurrency){
            $scope.expense.currency = selectedCurrency;
        });
    };
}]);