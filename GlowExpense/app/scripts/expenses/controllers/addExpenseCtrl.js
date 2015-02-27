'use strict';

angular.module('Expenses')
    .controller('AddExpenseCtrl', ['$scope', '$location', 'addExpensesTitle', 'addExpensesButtonLabel', 'reportsSharingSvc',
        'expensesRepositorySvc', 'editSaveExpenseDialogSvc', 'getIdFromLocationSvc', 'reportExpensesRepositorySvc',
        'errorDialogSvc', 'errorMessageSvc', 'errorHandlerDefaultSvc', 'localStorageSvc', 'sessionToken', 'expenseSvc', 'cameraSvc',
        'invoiceImageRepositorySvc', 'cameraSelectDialog', 'validateNumbersSvc', 'baseUrlMockeyWeb', 'expensesUrl', 'imagesUrl',
        'expensePostImageSvc', '$filter', 'expenseSharingSvc',
        function ($scope, $location, addExpensesTitle, addExpensesButtonLabel, reportsSharingSvc,
          expensesRepositorySvc, editSaveExpenseDialogSvc, getIdFromLocationSvc, reportExpensesRepositorySvc,
          errorDialogSvc, errorMessageSvc, errorHandlerDefaultSvc, localStorageSvc, sessionToken, expenseSvc,
          cameraSvc, invoiceImageRepositorySvc, cameraSelectDialog, validateNumbersSvc, baseUrlMockeyWeb, expensesUrl, imagesUrl,
          expensePostImageSvc, $filter, expenseSharingSvc) {

            $scope.title = addExpensesTitle;
            $scope.buttonLabel = addExpensesButtonLabel;
            $scope.showErrorMessage = false;
            $scope.imageSelectedPath = null;

            $scope.expense = {};

            $scope.expense.exchangeRate = 1;

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
                var newExpense = expenseSvc.create(expense);

                function createExpenseSuccess(response, responseHeaders) {
                    var headers = responseHeaders();

                    var createdExpenseId = getIdFromLocationSvc.getLastIdFromLocation(headers.location);

                    function addExpenseToReportSuccess() {

                        newExpense.expenseId = createdExpenseId;
                        newExpense.currency = expense.currency;
                        newExpense.contableCode = expense.contableCode;
                        expenseSharingSvc.addExpense(newExpense, $scope.report.expenseReportId);

                        editSaveExpenseDialogSvc.openSuccessSaveExpenseDialog().then(function (url) {
                            $location.path(url + '/' + $scope.report.expenseReportId);
                        });
                    }

                    function saveExpense() {
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

                    // upload image
                    if ($scope.imageSelectedPath) {
                        expensePostImageSvc.postImages($scope.imageSelectedPath,
                            localStorageSvc.getItem(sessionToken),
                            createdExpenseId
                        ).then(saveExpense, errorHandlerDefaultSvc.handleError, function (progress) {
                                console.log('expenses-post-image', progress);
                            });
                    }
                    else {
                        saveExpense();
                    }
                }

                function createExpenseError(errorResponse){
                    errorHandlerDefaultSvc.handleError(errorResponse).then(function(){
                    });
                }

                // TODO uncomment when tested with real services with working upload image
                if(form.$valid && validateNumbersSvc.validate(expense))// && $scope.imageSelectedPath)
                {
                    newExpense.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                    newExpense.originalCurrencyId =  expense.currency.id;
                    newExpense.contableCodeId = expense.contableCode.id;
                    newExpense.owner = localStorageSvc.getItem('userName');
                    var paramsObj = { 'token': localStorageSvc.getItem(sessionToken) };

                    expensesRepositorySvc.createExpense(paramsObj, newExpense.getData(), createExpenseSuccess, createExpenseError);
                }
                else
                {
                    $scope.showErrorMessage = true;
                }
            };
    }
] );
