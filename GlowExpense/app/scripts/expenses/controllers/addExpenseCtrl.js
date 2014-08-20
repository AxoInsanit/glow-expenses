'use strict';

angular.module('Expenses')
    .controller('AddExpenseCtrl', ['$scope', '$location', 'addExpensesTitle', 'addExpensesButtonLabel', 'reportsSharingSvc',
        'expensesRepositorySvc', 'editSaveExpenseDialogSvc', 'getIdFromLocationSvc', 'reportExpensesRepositorySvc',
        function ($scope, $location, addExpensesTitle, addExpensesButtonLabel, reportsSharingSvc,
          expensesRepositorySvc, editSaveExpenseDialogSvc, getIdFromLocationSvc, reportExpensesRepositorySvc) {

            $scope.title = addExpensesTitle;
            $scope.buttonLabel = addExpensesButtonLabel;
            $scope.showErrorMessage = false;

            $scope.expense = {};
            $scope.report = reportsSharingSvc.getReport();

            function createExpenseSuccess(response, responseHeaders){

                function addExpenseToReportSuccess(){
                    $location.path(url);
                }

                function addExpenseToReportFail(){

                }

                var headers = responseHeaders();
                var createdExpenseId = getIdFromLocationSvc.getIdFromLocation(headers.Location);

                var reportObj = {
                    "expenseReportId": report.expenseReportId,
                    "expenseIds": [createdExpenseId]
                };

                reportExpensesRepositorySvc.addExpensesToReport(
                    reportObj,
                    addExpenseToReportSuccess,
                    addExpenseToReportFail
                );
                editSaveExpenseDialogSvc.openSuccessSaveExpenseDialog().then(function(url){
                    $location.path(url);
                });
            }

            function createExpenseFail(){

            }

            $scope.save = function(form, expense) {
                if(form.$valid)
                {
                    expense.date = new Date();
                    expensesRepositorySvc.createExpense(expense, createExpenseSuccess, createExpenseFail);
                }
                else
                {
                    $scope.showErrorMessage = true;
                }
            };
    }
]);