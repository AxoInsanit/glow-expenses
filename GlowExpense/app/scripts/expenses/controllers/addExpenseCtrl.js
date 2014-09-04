'use strict';

angular.module('Expenses')
    .controller('AddExpenseCtrl', ['$scope', '$location', 'addExpensesTitle', 'addExpensesButtonLabel', 'reportsSharingSvc',
        'expensesRepositorySvc', 'editSaveExpenseDialogSvc', 'getIdFromLocationSvc', 'reportExpensesRepositorySvc',
        'errorDialogSvc', 'errorMessageSvc', 'errorHandlerDefaultSvc', 'localStorageSvc', 'sessionToken', 'expenseSvc',
        'cameraSvc', 'invoiceImageRepositorySvc', 'validateNumbersSvc',
        function ($scope, $location, addExpensesTitle, addExpensesButtonLabel, reportsSharingSvc,
          expensesRepositorySvc, editSaveExpenseDialogSvc, getIdFromLocationSvc, reportExpensesRepositorySvc,
          errorDialogSvc, errorMessageSvc, errorHandlerDefaultSvc, localStorageSvc, sessionToken, expenseSvc, cameraSvc,
          invoiceImageRepositorySvc, validateNumbersSvc) {

            $scope.title = addExpensesTitle;
            $scope.buttonLabel = addExpensesButtonLabel;
            $scope.showErrorMessage = false;
            $scope.imagePath = null;

            $scope.expense = {};

            var reportId = getIdFromLocationSvc.getFirstIdFromLocation($location.path());
            $scope.report = reportsSharingSvc.getReportById(reportId);
            debugger;
            $scope.takePhoto = function(expense) {
                
                $scope.imagePath = cameraSvc.takePhoto();
            };

            $scope.save = function(form, expense) {

                function createExpenseSuccess(response, responseHeaders){
                    var headers = responseHeaders();

                    var createdExpenseId = getIdFromLocationSvc.getLastIdFromLocation(headers.location);

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

                if(form.$valid && validateNumbersSvc.validate(expense))
                {
                    debugger;
                    expense.date = new Date();
                    var newExpense = expenseSvc.create(expense);

                    newExpense.originalCurrency = 1;
//                    console.log("$scope.imagePath " + $scope.imagePath);
//                    invoiceImageRepositorySvc.saveImage(
//                        {
//                            'expenseId': "123132fake1id",
//                            'token': localStorageSvc.getItem(sessionToken)
//
//                        },
//                        $scope.imagePath,
//                        createExpenseSuccess,
//                        errorHandlerDefaultSvc.handleError);

                    expensesRepositorySvc.createExpense(

                        { 'token': localStorageSvc.getItem(sessionToken) },
                        newExpense,
                        createExpenseSuccess,
                        errorHandlerDefaultSvc.handleError
                    );
//
//                    $http.post('http://127.0.0.1:8080/expense?token=' + localStorageSvc.getItem(sessionToken), newExpense)
//                        .success(function(data, status, headers, config) {
//                           debugger;
//                        }).error(function(data, status, headers, config) {
//                           debugger;
//                        });
                }
                else
                {
                    $scope.showErrorMessage = true;
                }
            };
    }
]);