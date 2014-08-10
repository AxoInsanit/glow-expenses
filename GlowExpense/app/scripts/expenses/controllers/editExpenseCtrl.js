'use strict';
/*global alert */

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
                    debugger;
                    $scope.report = report;
                });
            };

         //   $scope.report = null;
            $scope.reportCollection = null;

            $scope.haveReport = (editExpenseSvc.getReport() !== undefined);
            
            function onSuccess(reports) {
                $scope.reportCollection = reports;
                //debugger;                
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }

            $scope.createReport = function() {
                $location.path('/create-report');
            };

            $scope.date = $scope.expense.date;
            $scope.isEdit = true;
            $scope.imageSelectedPath = '';
            
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