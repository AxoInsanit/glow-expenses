'use strict';

angular.module('Expenses')
    .controller('AddExpenseCtrl', ['$scope', '$location', 'addExpensesTitle', 'addExpensesButtonLabel', 'reportsSharingSvc',
        'expensesRepositorySvc', 'editSaveExpenseDialogSvc', 'getIdFromLocationSvc', 'reportExpensesRepositorySvc',
<<<<<<< HEAD
        'errorDialogSvc', 'errorMessageSvc', 'errorHandlerDefaultSvc', 'localStorageSvc', 'sessionToken', 'expenseSvc', 'cameraSvc', 
        'invoiceImageRepositorySvc', 'imageFileShareSvc', 'expenseIdShareSvc', 'expensePostImageSvc',
        'cameraSelectDialog',
        function ($scope, $location, addExpensesTitle, addExpensesButtonLabel, reportsSharingSvc,
          expensesRepositorySvc, editSaveExpenseDialogSvc, getIdFromLocationSvc, reportExpensesRepositorySvc,
          errorDialogSvc, errorMessageSvc, errorHandlerDefaultSvc, localStorageSvc, sessionToken, expenseSvc, 
          cameraSvc, invoiceImageRepositorySvc, imageFileShareSvc, expenseIdShareSvc, expensePostImageSvc,
          cameraSelectDialog) {
=======
        'errorDialogSvc', 'errorMessageSvc', 'errorHandlerDefaultSvc', 'localStorageSvc', 'sessionToken', 'expenseSvc',
        'cameraSvc', 'invoiceImageRepositorySvc', 'validateNumbersSvc',
        function ($scope, $location, addExpensesTitle, addExpensesButtonLabel, reportsSharingSvc,
          expensesRepositorySvc, editSaveExpenseDialogSvc, getIdFromLocationSvc, reportExpensesRepositorySvc,
          errorDialogSvc, errorMessageSvc, errorHandlerDefaultSvc, localStorageSvc, sessionToken, expenseSvc, cameraSvc,
          invoiceImageRepositorySvc, validateNumbersSvc) {
>>>>>>> b6c2254aaa1c9b4f3855fe3617360e7a59582694

            $scope.title = addExpensesTitle;
            $scope.buttonLabel = addExpensesButtonLabel;
            $scope.showErrorMessage = false;
            $scope.imagePath = null;

            $scope.expense = {};

            var reportId = getIdFromLocationSvc.getFirstIdFromLocation($location.path());
            $scope.report = reportsSharingSvc.getReportById(reportId);
            debugger;
            $scope.takePhoto = function(expense) {
                cameraSelectDialog.open().then(function() {
                    cameraSvc.takePhoto().then(function(result){
                        $scope.imageSelectedPath = result;
                    });
                });
            };

            $scope.save = function(form, expense) {

                function createExpenseSuccess(response, responseHeaders){
                    var headers = responseHeaders();
                    // TODO remove when the service returns location
                    var createdExpenseId = getIdFromLocationSvc.getLastIdFromLocation(headers.location);
                    //push image tests
                    var fd = new FormData();
                    fd.append('file', $scope.imagePath);
                    //save file i nservice
                    imageFileShareSvc.setFile(fd);
                    //save id in service
                    expenseIdShareSvc.setId(createdExpenseId);
                    //post image service

                    function addExpenseToReportSuccess(){

                        expense.expenseId = createdExpenseId;
                        reportsSharingSvc.expenseSharingSvc.addExpense(expense, $scope.report.expenseReportId);

                        editSaveExpenseDialogSvc.openSuccessSaveExpenseDialog().then(function(url){
                            $location.path(url + '/' + $scope.report.expenseReportId);
                        });
                    }
                    expensePostImageSvc.saveImage().when(function(response){
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
                    });
                }

                if(form.$valid && validateNumbersSvc.validate(expense))
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