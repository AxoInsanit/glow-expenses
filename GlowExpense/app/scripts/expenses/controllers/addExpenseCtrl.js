'use strict';

angular.module('Expenses')
    .controller('AddExpenseCtrl', ['$scope', '$location', 'addExpensesTitle', 'addExpensesButtonLabel', 'reportsSharingSvc',
        'expensesRepositorySvc', 'editSaveExpenseDialogSvc', 'getIdFromLocationSvc', 'reportExpensesRepositorySvc',
        'errorDialogSvc', 'errorMessageSvc', 'errorHandlerDefaultSvc', 'localStorageSvc', 'sessionToken', 'expenseSvc',
        function ($scope, $location, addExpensesTitle, addExpensesButtonLabel, reportsSharingSvc,
          expensesRepositorySvc, editSaveExpenseDialogSvc, getIdFromLocationSvc, reportExpensesRepositorySvc,
          errorDialogSvc, errorMessageSvc, errorHandlerDefaultSvc, localStorageSvc, sessionToken, expenseSvc) {

            $scope.title = addExpensesTitle;
            $scope.buttonLabel = addExpensesButtonLabel;
            $scope.showErrorMessage = false;

            $scope.expense = {};

            var reportId = getIdFromLocationSvc.getFirstIdFromLocation($location.path());
            $scope.report = reportsSharingSvc.getReportById(reportId);
            debugger;

            $scope.save = function(form, expense) {

                function createExpenseSuccess(response, responseHeaders){

                    var headers = responseHeaders();

                    // TODO remove when the service returns location
                    headers.Location = response.location;
                    var createdExpenseId = getIdFromLocationSvc.getLastIdFromLocation(headers.Location);

                    function addExpenseToReportSuccess(){

                        expense.expenseId = createdExpenseId;

                        reportsSharingSvc.expenseSharingSvc.addExpense(expense, $scope.report.expenseReportId);

                        editSaveExpenseDialogSvc.openSuccessSaveExpenseDialog().then(function(url){
                            $location.path(url + '/' + $scope.report.expenseReportId);
                        });
                    }

                    reportExpensesRepositorySvc.addExpensesToReport(
                        {
                            'token': localStorageSvc.getItem(sessionToken)
                        },
                        {
                            'expenseReportId': $scope.report.expenseReportId,
                            'expenseIds': [createdExpenseId]
                        },
                        addExpenseToReportSuccess,
                        errorHandlerDefaultSvc.handleError
                    );
                }

                if(form.$valid)
                {
                    expense.date = new Date();
                    var newExpense = expenseSvc.create(expense);

                    newExpense.originalCurrency = 1;

                    expensesRepositorySvc.createExpense(

                        { 'token': localStorageSvc.getItem(sessionToken) },
                        newExpense,
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