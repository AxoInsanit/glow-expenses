'use strict';

angular.module('Expenses')
    .controller('AddExpenseCtrl', ['$scope', '$location', 'addExpensesTitle', 'addExpensesButtonLabel', 'reportsSharingSvc',
        'expensesRepositorySvc', 'editSaveExpenseDialogSvc', 'getIdFromLocationSvc', 'reportExpensesRepositorySvc',
        'errorDialogSvc', 'errorMessageSvc', 'errorHandlerDefaultSvc', 'localStorageSvc', 'sessionToken', 'expenseSvc', 'cameraSvc', 'invoiceImageRepositorySvc',
        function ($scope, $location, addExpensesTitle, addExpensesButtonLabel, reportsSharingSvc,
          expensesRepositorySvc, editSaveExpenseDialogSvc, getIdFromLocationSvc, reportExpensesRepositorySvc,
          errorDialogSvc, errorMessageSvc, errorHandlerDefaultSvc, localStorageSvc, sessionToken, expenseSvc, cameraSvc, invoiceImageRepositorySvc) {

            $scope.title = addExpensesTitle;
            $scope.buttonLabel = addExpensesButtonLabel;
            $scope.showErrorMessage = false;
            $scope.imagePath = null;

            $scope.expense = {};

            var reportId = getIdFromLocationSvc.getFirstIdFromLocation($location.path());
            $scope.report = reportsSharingSvc.getReportById(reportId);

            $scope.takePhoto = function(expense) {
                
                $scope.imagePath = cameraSvc.takePhoto();
            };

            $scope.save = function(form, expense) {

                function createExpenseSuccess(response, responseHeaders){
                    var headers = responseHeaders();
                    debugger;
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


                if(form.$valid && validateNumbers(expense))
                {
                    debugger;
                    expense.date = new Date();
                    var newExpense = expenseSvc.create(expense);

                    newExpense.originalCurrency = 1;
                    console.log("$scope.imagePath " + $scope.imagePath);
                    invoiceImageRepositorySvc.saveImage(
                        {
                            'expenseId': "123132fake1id",
                            'token': localStorageSvc.getItem(sessionToken)
                            
                        },
                        $scope.imagePath,
                        createExpenseSuccess,
                        errorHandlerDefaultSvc.handleError);

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

            function validateNumbers(expense){
                var result = false;

                var exchangeRate = parseInt(expense.exchangeRate, 10);
                var originalAmount = parseInt(expense.originalAmount, 10);

                if ((exchangeRate && exchangeRate > 0) && (originalAmount && originalAmount > 0)){
                    result = true;
                }

                return result;
            }
    }
]);