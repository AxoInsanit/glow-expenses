'use strict';

angular.module('Expenses')
    .controller('EditExpenseCtrl', ['$scope', '$location', 'editExpensesTitle', 'editExpensesButtonLabel', 'editExpenseSvc',
        'cameraSvc', 'reportsRepositorySvc', 'currencySelectDialogSvc', 'expensesRepositorySvc', 'editSaveExpenseDialogSvc',
        'expenseReportsDialogSvc',
        function ($scope,  $location, editExpensesTitle, editExpensesButtonLabel, editExpenseSvc, cameraSvc,
                  reportsRepositorySvc, currencySelectDialogSvc, expensesRepositorySvc, editSaveExpenseDialogSvc,
                  expenseReportsDialogSvc) {

            $scope.title = editExpensesTitle;
            $scope.buttonLabel = editExpensesButtonLabel;
            $scope.showErrorMessage = false;
            
            $scope.expense = editExpenseSvc.getExpenseForEdit();
            $scope.report = {};
            $scope.imageSelectedPath = '';

            if($scope.expense.imageType !== 'void')
            {
                expensesRepositorySvc.getImage({},  {'image': 'image'}).$promise.then(function (result) {
                    $scope.imageSelectedPath = result.invoiceImage;
                });
            }

            $scope.save = function(form, expense) {
                if(form.$valid)
                {
                    expense.date = expense.date;
                    // TODO Uncomment this when services are ready
//                    expensesRepositorySvc.saveExpense(expense).then(function(){
//                        editSaveExpenseDialogSvc.openEditExpenseDialog($scope.report.description).then(function(){
//                            $location.path(url);
//                        });
//                    });

                    editSaveExpenseDialogSvc.openSuccessEditExpenseDialog($scope.report.description).then(function(url){
                        $location.path(url);
                    });
                }
                else
                {
                    $scope.showErrorMessage = true;
                }
            };

            $scope.selectReport = function(){
                expenseReportsDialogSvc.open().then(function(report){
                    $scope.report = report;
                });
            };

            $scope.date = $scope.expense.date;
            $scope.isEdit = true;

            
            $scope.cancelPhoto = function() {
                $scope.imageSelectedPath = '';
            };
            
            $scope.viewImage = function() {
                $location.path('/invoice-expense-image');
            };

            $scope.takePhoto = function() {
                cameraSvc.takePhoto().then(function(result){
                    $scope.imageSelectedPath = result;
                });
            };
        }
]);