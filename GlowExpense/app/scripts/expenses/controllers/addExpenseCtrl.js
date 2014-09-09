'use strict';

angular.module('Expenses')
    .controller('AddExpenseCtrl', ['$scope', '$location', 'addExpensesTitle', 'addExpensesButtonLabel', 'reportsSharingSvc',
        'expensesRepositorySvc', 'editSaveExpenseDialogSvc', 'getIdFromLocationSvc', 'reportExpensesRepositorySvc',
        'errorDialogSvc', 'errorMessageSvc', 'errorHandlerDefaultSvc', 'localStorageSvc', 'sessionToken', 'expenseSvc', 'cameraSvc',
        'invoiceImageRepositorySvc', 'cameraSelectDialog', 'validateNumbersSvc',
        function ($scope, $location, addExpensesTitle, addExpensesButtonLabel, reportsSharingSvc,
          expensesRepositorySvc, editSaveExpenseDialogSvc, getIdFromLocationSvc, reportExpensesRepositorySvc,
          errorDialogSvc, errorMessageSvc, errorHandlerDefaultSvc, localStorageSvc, sessionToken, expenseSvc,
          cameraSvc, invoiceImageRepositorySvc, cameraSelectDialog, validateNumbersSvc) {


            $scope.title = addExpensesTitle;
            $scope.buttonLabel = addExpensesButtonLabel;
            $scope.showErrorMessage = false;
            $scope.imagePath = null;

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
                    //push image tests
                    // var fd = new FormData();
                    // fd.append('file', $scope.imagePath);
                    // //post image service

                    // $http.post(baseUrlMockeyWeb + expensesUrl + imagesUrl +'?expenseId='+ createdExpenseId + '&token=' + localStorageSvc.getItem(sessionToken),fd, {
                    //         transformRequest: angular.identity,
                    //         headers: {'Content-Type': undefined}
                    //     })
                    //     .success(function(){
                    //         alert('Happens');
                    //         addExpenseToReport();
                    //     })
                    //     .error(function(){
                    //         alert('Sry');
                    //     });
                    // TODO : WHEN WE REMOVE THE COMMENT WE NEED TO INCLUDE THE FUNCTION IN THE SUCCESS

                    function addExpenseToReportSuccess(){
                        debugger;
                        expense.expenseId = createdExpenseId;
                        reportsSharingSvc.expenseSharingSvc.addExpense(expense, $scope.report.expenseReportId);

                        editSaveExpenseDialogSvc.openSuccessSaveExpenseDialog().then(function(url){
                            $location.path(url + '/' + $scope.report.expenseReportId);
                        });
                    }
debugger;
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
                    expense.date = new Date();
                    var newExpense = expenseSvc.create(expense);

                    newExpense.originalCurrency = 1;
                    debugger;
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
