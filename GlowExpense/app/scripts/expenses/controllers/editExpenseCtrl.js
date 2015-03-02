'use strict';

angular.module('Expenses')
    .controller('EditExpenseCtrl', function ($scope,  $location, editExpensesTitle, editExpensesButtonLabel, expenseSharingSvc, cameraSvc,
                                             reportsRepositorySvc, currencySelectDialogSvc, contableCodeSelectDialogSvc, expensesRepositorySvc,
                                             editSaveExpenseDialogSvc, expenseViewImageSvc, reportsSharingSvc, reportEntityName, filterReportByStateSvc,
                                             itemsSelectionDialogSvc, reportExpensesRepositorySvc, localStorageSvc, sessionToken, reportDetailsPath,
                                             expensesPath, invoiceImageRepositorySvc, errorHandlerDefaultSvc, expenseSvc,
                                             baseUrlMockeyWeb, validateNumbersSvc, cameraSelectDialog, expenseIdShareSvc, cameraSelectDialogListenerSvc,
                                             expensePostImageSvc, saveExpenseStateSvc, $routeParams) {

        var imageSelected = false,
            originalExpense,
            lastSelectedReport,
            reportId = $routeParams.reportId;

        $scope.title = editExpensesTitle;
        $scope.buttonLabel = editExpensesButtonLabel;
        $scope.showErrorMessage = false;
        $scope.expenseId = $routeParams.expenseId;
        $scope.reportId = reportId;
        $scope.token = localStorageSvc.getItem(sessionToken);
        $scope.path = baseUrlMockeyWeb;



        $scope.save = function(form, expense) {
            var reportObj = {
                'expenseReportId': $scope.report.expenseReportId,
                'expenseIds': [$scope.expense.expenseId]
            };

            function saveExpenseSuccess(){

                disableResetExpenseHandler();

                function addExpenseSuccess(){
                    if (reportId === 0) {
                        //delete expense from local list of unassigned expenses.
                        expenseSharingSvc.deleteExpense($scope.expense.expenseId, reportId, true);
                    }
                    expenseSharingSvc.addExpense($scope.expense, $scope.report.expenseReportId);
                    expenseSharingSvc.resetExpenses();
                    $location.path(reportDetailsPath + '/' + $scope.report.expenseReportId);
                }

                function addExpenseFail(errorResponse){
                    errorHandlerDefaultSvc.handleError(errorResponse).then(function(){
                        expenseSharingSvc.resetExpenses();
                        resetExpense();
                    });
                }

                function addExpense(){
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

                //expense assigned to another report
                if (lastSelectedReport !== $scope.report.expenseReportId){
                    if (reportId) {
                        //expense is already assigned to a report
                        expenseSharingSvc.deleteExpense($scope.expense.expenseId, reportId, true).then(addExpense, deleteExpenseFail);
                    }
                    else {
                        //expense is not assigned to any report yet
                        addExpense();
                    }
                }
                //no change in the state of expense
                else
                {
                    expenseSharingSvc.updateExpense(expense, reportId);
                    expenseSharingSvc.resetExpenses();

                    if ($scope.report.expenseReportId) {
                        // it is assigned go to report details
                        $location.path(reportDetailsPath + '/' + $scope.report.expenseReportId);
                        // it is unassigned go to expenses list
                    } else {
                        $location.path(expensesPath);
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
            $scope.expense = angular.copy(originalExpense);
        }


        // this should be done with transitionend on the sliding ng-view
        if ($routeParams.imageModal) {
            cameraSelectDialog.open().then(function() {

                cameraSvc.takePhoto().then(function(result){
                    imageSelected = true;
                    $scope.imageSelectedPath = result;
                });
            });
        }


        expenseSharingSvc.getExpenseById($routeParams.expenseId, $routeParams.reportId).then(function (expense) {
            originalExpense = angular.copy(expense);
            if ($routeParams.reportId) {
                $scope.report = reportsSharingSvc.getReportById($routeParams.reportId);
                lastSelectedReport = $scope.report.expenseReportId;
            } else {
                $scope.report = {};
            }

            if(expense.imageType !== 'void') {
                $scope.imageSelectedPath = invoiceImageRepositorySvc.getImage(localStorageSvc.getItem(sessionToken), $routeParams.expenseId);
            }

            $scope.date = expense.date;
            $scope.expense = expense;

            if (cameraSelectDialogListenerSvc.openCameraSelectDlg) {
                cameraSelectDialogListenerSvc.openCameraSelectDlg = false;
                $scope.takePhoto();
            }

        });

        var disableResetExpenseHandler = $scope.$on('$destroy', function () {
            expenseSharingSvc.updateExpense(originalExpense, $routeParams.reportId);
        });

    }
);
