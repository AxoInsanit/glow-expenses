'use strict';

angular.module('Expenses')
    .controller('EditExpenseCtrl', function ($scope,  $location, editExpensesTitle, editExpensesButtonLabel, expenseSharingSvc, cameraSvc,
                                             reportsRepositorySvc, currencySelectDialogSvc, contableCodeSelectDialogSvc, expensesRepositorySvc,
                                             editSaveExpenseDialogSvc, expenseViewImageSvc, reportsSharingSvc, reportEntityName, filterReportByStateSvc,
                                             itemsSelectionDialogSvc, reportExpensesRepositorySvc, localStorageSvc, sessionToken, reportDetailsPath,
                                             expensesPath, invoiceImageRepositorySvc, errorHandlerDefaultSvc, getIdFromLocationSvc, expenseSvc,
                                             baseUrlMockeyWeb, validateNumbersSvc, cameraSelectDialog, expenseIdShareSvc, cameraSelectDialogListenerSvc,
                                             expensePostImageSvc, saveExpenseStateSvc, $routeParams) {

        var imageSelected = false;

        $scope.title = editExpensesTitle;
        $scope.buttonLabel = editExpensesButtonLabel;
        $scope.showErrorMessage = false;
        $scope.expenseId = getIdFromLocationSvc.getLastIdFromLocation($location.path());
        $scope.token = localStorageSvc.getItem(sessionToken);
        $scope.path = baseUrlMockeyWeb;


        // this should be done with transitionend on the sliding ng-view
        if ($routeParams.imageModal) {
            cameraSelectDialog.open().then(function() {

                cameraSvc.takePhoto().then(function(result){
                    imageSelected = true;
                    $scope.imageSelectedPath = result;
                });
            });
        }

        var expenseWithSavedState = saveExpenseStateSvc.get();

        if (!expenseWithSavedState){
            $scope.expense = angular.copy(expenseSharingSvc.getExpenseById($scope.expenseId, $scope.reportId));
        }
        else {
            $scope.expense = expenseWithSavedState;
        }

        var  originalExpense = angular.copy($scope.expense);

        function isInReport(){
            return $location.path().indexOf('report-details') > -1;
        }

        var reportId = 0;
        if (isInReport()){
            reportId = getIdFromLocationSvc.getFirstIdFromLocation($location.path());
        }

        $scope.report = reportsSharingSvc.getReportById(reportId);
        var lastSelectedReport = $scope.report.description;

        var selectedImage = saveExpenseStateSvc.getImage();

        if (selectedImage){
            $scope.imageSelectedPath = selectedImage;
        }
        else {
            $scope.imageSelectedPath = '';
        }

        if($scope.expense.imageType !== 'void')
        {
            $scope.imageSelectedPath = invoiceImageRepositorySvc.getImage(localStorageSvc.getItem(sessionToken), $scope.expenseId);
        }

        function addExpenseSuccess(){
            reportsSharingSvc.expenseSharingSvc.addExpense($scope.expense, $scope.report.expenseReportId);
            $location.path(reportDetailsPath + '/' + $scope.report.expenseReportId);
        }

        function updateExpenseSuccess(){
            reportsSharingSvc.expenseSharingSvc.updateExpense($scope.expense, $scope.report.expenseReportId);
            $location.path(reportDetailsPath + '/' + $scope.report.expenseReportId);
        }

        function addExpenseFail(errorResponse){
            errorHandlerDefaultSvc.handleError(errorResponse).then(function(){
                resetExpense();
            });
        }

        $scope.save = function(form, expense) {
            var reportObj = {
                'expenseReportId': $scope.report.expenseReportId,
                'expenseIds': [$scope.expense.expenseId]
            };

            function saveExpenseSuccess(){
                expenseSharingSvc.updateExpense(expense, reportId);

                function deleteExpenseSuccess(){
                    reportsSharingSvc.expenseSharingSvc.deleteExpense($scope.expense.expenseId, reportId);
                    reportExpensesRepositorySvc.addExpensesToReport(
                        { 'token': localStorageSvc.getItem(sessionToken) },
                        reportObj,
                        addExpenseSuccess,
                        addExpenseFail
                    );
                }

                function deleteExpenseFail(errorResponse){
                    errorHandlerDefaultSvc.handleError(errorResponse).then(function(){
                        resetExpense();
                    });
                }

                // expense was just assigned to a report
                if (!lastSelectedReport && $scope.report.description){
                    reportExpensesRepositorySvc.addExpensesToReport(
                        { 'token': localStorageSvc.getItem(sessionToken) },
                        reportObj,
                        addExpenseSuccess,
                        addExpenseFail
                    );
                }
                else {
                    // change assigned expense to another report
                    if (lastSelectedReport !== $scope.report.description){
                        reportExpensesRepositorySvc.deleteExpense(
                            {
                                'token': localStorageSvc.getItem(sessionToken),
                                'expenseId': $scope.expense.expenseId
                            },
                            deleteExpenseSuccess,
                            deleteExpenseFail
                        );
                    }
                    // no change in the state of expense
                    else
                    {
                        // it is assigned go to report details
                        if ($scope.report.description){
                            updateExpenseSuccess();
                        }
                        // it is unassigned go to expenses list
                        else {
                            $location.path(expensesPath);
                        }
                    }
                }
            }

            function saveExpenseError(errorResponse){
                errorHandlerDefaultSvc.handleError(errorResponse).then(function(){
                    resetExpense();
                });
            }

            function saveExpense(){
                var newExpense = expenseSvc.create(expense);
                    newExpense.date = new Date();
                    newExpense.originalCurrencyId = expense.currency.id;
                    newExpense.contableCodeId = expense.contableCode.id;
                var paramsObj = { 'token': localStorageSvc.getItem(sessionToken) };
                expensesRepositorySvc.saveExpense(paramsObj, newExpense.getData(), saveExpenseSuccess, saveExpenseError);
            }


            if(form.$valid && validateNumbersSvc.validate(expense))
            {
                if (imageSelected) {
                    expensePostImageSvc.postImages($scope.imageSelectedPath,
                        localStorageSvc.getItem(sessionToken),
                        $scope.expense.expenseId
                    ).then(saveExpense, errorHandlerDefaultSvc.handleError, function (progress) {
                            console.log('expenses-post-image', progress);
                        });
                } else {
                    saveExpense();
                }
            }
            else
            {
                $scope.showErrorMessage = true;
            }
        };

        $scope.selectReport = function(){
            reportsSharingSvc.getReports().then(function(response){
                $scope.reports = response.filter(filterReportByStateSvc.checkIfInState);
                itemsSelectionDialogSvc.open($scope.reports, reportEntityName).then(function(selectedReport){
                    if (selectedReport){
                        $scope.report =  selectedReport;
                    }
                });
            });
        };

        $scope.date = $scope.expense.date;
        $scope.isEdit = true;

        $scope.cancelPhoto = function() {
            $scope.imageSelectedPath = '';
        };

        $scope.takePhoto = function() {
            cameraSelectDialog.open().then(function() {
                cameraSvc.takePhoto().then(function(result){
                    imageSelected = true;
                    $scope.imageSelectedPath = result;
                    saveExpenseStateSvc.setImage(result);
                });
            });
        };

        $scope.viewImage = function(){
            saveExpenseStateSvc.set($scope.expense);
            expenseIdShareSvc.setId($scope.expenseId);
            expenseViewImageSvc.open($scope.expenseId).then(function(){
                $scope.takePhoto();
            },{});
        };

        function resetExpense(){
            $scope.expense =  angular.copy(originalExpense);
        }
    }
);
