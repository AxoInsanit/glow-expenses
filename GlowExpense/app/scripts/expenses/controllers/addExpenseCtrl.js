'use strict';

angular.module('Expenses')
    .controller('AddExpenseCtrl', ['$scope', '$location', 'addExpensesTitle', 'addExpensesButtonLabel', 'reportsSharingSvc',
        'expensesRepositorySvc', 'editSaveExpenseDialogSvc', 'getIdFromLocationSvc', 'reportExpensesRepositorySvc',
        'errorDialogSvc', 'errorMessageSvc', 'errorHandlerDefaultSvc', 'localStorageSvc', 'sessionToken', 'expenseSvc', 'cameraSvc',
        'invoiceImageRepositorySvc', 'cameraSelectDialog', 'validateNumbersSvc', 'baseUrlMockeyWeb', 'expensesUrl', 'imagesUrl',
        'expensePostImageSvc',
        function ($scope, $location, addExpensesTitle, addExpensesButtonLabel, reportsSharingSvc,
          expensesRepositorySvc, editSaveExpenseDialogSvc, getIdFromLocationSvc, reportExpensesRepositorySvc,
          errorDialogSvc, errorMessageSvc, errorHandlerDefaultSvc, localStorageSvc, sessionToken, expenseSvc,
          cameraSvc, invoiceImageRepositorySvc, cameraSelectDialog, validateNumbersSvc, baseUrlMockeyWeb, expensesUrl, imagesUrl,
          expensePostImageSvc) {


            $scope.title = addExpensesTitle;
            $scope.buttonLabel = addExpensesButtonLabel;
            $scope.showErrorMessage = false;
            $scope.imageSelectedPath = null;

            $scope.expense = {};

            var reportId = getIdFromLocationSvc.getFirstIdFromLocation($location.path());
            $scope.report = reportsSharingSvc.getReportById(reportId);
            $scope.takePhoto = function() {
                cameraSelectDialog.open().then(function() {
                    cameraSvc.takePhoto().then(function(result){
                        $scope.imageSelectedPath = result;
                    });
                });
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

                    function postImageSuccess(){
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
                    // TODO remove when tested with real services with working upload image
                    postImageSuccess();

                    // TODO uncomment when tested with real services with working upload image
/*                   var fd = new FormData();
                   fd.append('file', $scope.imageSelectedPath);
                   expensePostImageSvc.postImages(
                       {
                           'expenseId': createdExpenseId,
                           'token': localStorageSvc.getItem(sessionToken)
                       },
                       $scope.imageSelectedPath,
                       postImageSuccess,
                       errorHandlerDefaultSvc.handleError
                   );*/
                }

                // TODO uncomment when tested with real services with working upload image
                if(form.$valid && validateNumbersSvc.validate(expense))// && $scope.imageSelectedPath)
                {
                    expense.date = new Date();

                    var newExpense = expenseSvc.create(expense);
                    newExpense.originalCurrency =  expense.currency.id;
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
] );
