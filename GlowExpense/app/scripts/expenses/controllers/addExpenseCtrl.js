'use strict';

angular.module('Expenses')
    .controller('AddExpenseCtrl', ['$scope', '$location', 'addExpensesTitle', 'addExpensesButtonLabel', 'reportsSharingSvc',
        'expensesRepositorySvc', 'editSaveExpenseDialogSvc', 'getIdFromLocationSvc', 'reportExpensesRepositorySvc',
        'errorDialogSvc', 'errorMessageSvc', 'errorHandlerDefaultSvc',
        function ($scope, $location, addExpensesTitle, addExpensesButtonLabel, reportsSharingSvc,
          expensesRepositorySvc, editSaveExpenseDialogSvc, getIdFromLocationSvc, reportExpensesRepositorySvc,
          errorDialogSvc, errorMessageSvc, errorHandlerDefaultSvc) {

            $scope.title = addExpensesTitle;
            $scope.buttonLabel = addExpensesButtonLabel;
            $scope.showErrorMessage = false;

            $scope.expense = {};
            $scope.report = reportsSharingSvc.getReport();

            function createExpenseSuccess(response, responseHeaders){

                function addExpenseToReportSuccess(){
                    editSaveExpenseDialogSvc.openSuccessSaveExpenseDialog().then(function(url){
                        $location.path(url);
                    });
                }

                var headers = responseHeaders();
                var createdExpenseId = getIdFromLocationSvc.getIdFromLocation(headers.Location);

                var reportObj = {
                    'expenseReportId': $scope.report.expenseReportId,
                    'expenseIds': [createdExpenseId]
                };

                reportExpensesRepositorySvc.addExpensesToReport(
                    reportObj,
                    addExpenseToReportSuccess,
                    errorHandlerDefaultSvc.handleError
                );
            }

            $scope.save = function(form, expense) {
                if(form.$valid)
                {
                    expense.date = new Date();
                    expensesRepositorySvc.createExpense(
                        expense,
                        createExpenseSuccess,
                        errorHandlerDefaultSvc.handleError
                    );
                }
                else
                {
                    $scope.showErrorMessage = true;
                }
            };
    }
]);