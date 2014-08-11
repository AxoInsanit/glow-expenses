'use strict';

angular.module('Expenses')
    .controller('EditExpenseCtrl', ['$scope', '$location', 'editExpensesTitle', 'editExpensesButtonLabel', 'editExpenseSvc',
        'cameraSvc', 'reportsRepositorySvc', 'currencySelectDialogSvc', 'expensesRepositorySvc', 'editSaveExpenseDialogSvc',
        'expenseReportsDialogSvc', '$http',
        function ($scope,  $location, editExpensesTitle, editExpensesButtonLabel, editExpenseSvc, cameraSvc,
                  reportsRepositorySvc, currencySelectDialogSvc, expensesRepositorySvc, editSaveExpenseDialogSvc,
                  expenseReportsDialogSvc, $http) {

            $scope.title = editExpensesTitle;
            $scope.buttonLabel = editExpensesButtonLabel;
            $scope.showErrorMessage = false;
            
            $scope.expense = editExpenseSvc.getExpenseForEdit();
            $scope.report = {};
            $scope.imageSelectedPath = '';

            //debugger;
            if($scope.expense.imageType != "void")
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
                $scope.imageSelectedPath = "";
            };
            
            $scope.viewImage = function() {
                $location.path('/invoice-expense-image');
            };

            // if ($scope.expense.imageType !== 'void'){
            //     $scope.imageSelectedPath = './scripts/expenses/views/img.jpg';
            // }

            //set the report to undefined after we show the view so if we go 
            //back to expenses list and click on expense we wont see old report 
            //and we can see the full list.

            //and we check are we looking in expense that is in report or we look at 
            //free one in the list
//            if($scope.haveReport)
//            {
//                $scope.report = editExpenseSvc.getReport();
//               // editExpenseSvc.setReport(undefined);
//            }
//            else
//            {
//                reportsRepositorySvc.getReports(onSuccess,onFail);
//            }

            $scope.takePhoto = function() {
                cameraSvc.takePhoto().then(function(result){
                    $scope.imageSelectedPath = result;
                });
            };
        }
]);