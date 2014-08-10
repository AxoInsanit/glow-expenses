'use strict';

angular.module('Expenses')
    .controller('AddEditExpenseCtrl', ['$scope', '$location', 'expensesRepositorySvc', 'addExpenseErrorMsg', '$modal',
        'currenciesSvc', 'reportSharingSvc', 'currencySelectDialogSvc',

        function ($scope, $location, expensesRepositorySvc, addExpenseErrorMsg, $modal, currenciesSvc, reportSharingSvc,
                  currencySelectDialogSvc) {

            $scope.errorMessage = addExpenseErrorMsg;
            $scope.showErrorMessage = false;
           // $scope.report = reportSharingSvc.getReport();
            $scope.selectedReport = null;
            //debugger;
            $scope.currencies = currenciesSvc.get();

            $scope.selectCurrency = function(currency){
                debugger;
                currencySelectDialogSvc.open(currency, $scope.currencies).then(function(selectedCurrency){
                    debugger;
                    $scope.expense.currency = selectedCurrency;
                });
            };

            $scope.isEditExpense = false;

            if($location.$$path.indexOf('edit-')>0)
            {
              $scope.isEditExpense = true;
            }

            $scope.createReport = function() {
                $location.path('/create-report');
            };

            $scope.expenseTypeModal = function($event) {
                var modalInstance = $modal.open({
                  templateUrl: 'expenseTypeModal',
                  controller: expenseTypeModalCtrl,
                  resolve: {
                    expenseTypes: function () {
                      return {'types': $scope.expenseTypes,'target':event.target};
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
                      return {'types': $scope.currencies,'target':event.target};
                    }
                  }
                });
                modalInstance.result.then(function (selectedItem) {
                    //debugger;
                }, function (item) {
                    //debugger;
                });
            };

            //on click of report list into free expense
            $scope.selectReport  = function(reportId) {
                $scope.selectedReport = reportId;
            };

//            $scope.addOrEdit = function(form, expense) {
//              expense.reportId = $scope.selectedReport;
//                function onSuccess() {
//                    $scope.showErrorMessage = false;
//                    var modalInstance = $modal.open({
//                      templateUrl: 'editSaveExpenseModal',
//                      controller: editSaveCtrl,
//                      resolve: {
//                        data: function () {
//                          return {'report':$scope.report};
//                        }
//                      }
//                    });
//                }
//
//                function onFail() {
//                    $scope.showErrorMessage = true;
//                }
//
//                if(form.$valid)
//                {
//                    expense.date = expense.date || new Date();
//                    expensesRepositorySvc.saveExpense(expense, onSuccess, onFail);
//                }
//                else
//                {
//                    $scope.showErrorMessage = true;
//                }
//            };

            $scope.addOrEdit = function(form, expense) {
                if(form.$valid)
                {
                    expense.date = expense.date || new Date();
                   // expensesRepositorySvc.saveExpense(expense, onSuccess, onFail);
                }
                else
                {
                    $scope.showErrorMessage = true;
                }
            };
        }
]);