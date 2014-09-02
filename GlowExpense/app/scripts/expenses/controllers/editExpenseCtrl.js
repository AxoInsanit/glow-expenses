'use strict';

angular.module('Expenses')
    .controller('EditExpenseCtrl', ['$scope', '$location', 'editExpensesTitle', 'editExpensesButtonLabel', 'expenseSharingSvc',
        'cameraSvc', 'reportsRepositorySvc', 'currencySelectDialogSvc', 'expensesRepositorySvc', 'editSaveExpenseDialogSvc',
        'expenseViewImageSvc', 'reportsSharingSvc', 'reportEntityName', 'filterReportByStateSvc',
        'itemsSelectionDialogSvc', 'reportExpensesRepositorySvc', 'localStorageSvc', 'sessionToken', 'reportDetailsPath',
        'expensesPath', 'invoiceImageRepositorySvc', 'errorHandlerDefaultSvc', 'getIdFromLocationSvc', 'expenseSvc',
        function ($scope,  $location, editExpensesTitle, editExpensesButtonLabel, expenseSharingSvc, cameraSvc,
                  reportsRepositorySvc, currencySelectDialogSvc, expensesRepositorySvc, editSaveExpenseDialogSvc,
                  expenseViewImageSvc, reportsSharingSvc, reportEntityName, filterReportByStateSvc,
                  itemsSelectionDialogSvc, reportExpensesRepositorySvc, localStorageSvc, sessionToken, reportDetailsPath,
                expensesPath, invoiceImageRepositorySvc, errorHandlerDefaultSvc, getIdFromLocationSvc, expenseSvc) {

            $scope.title = editExpensesTitle;
            $scope.buttonLabel = editExpensesButtonLabel;
            $scope.showErrorMessage = false;

            var expenseId = getIdFromLocationSvc.getLastIdFromLocation($location.path());

            $scope.expense = expenseSharingSvc.getExpenseById(expenseId, $scope.reportId);

            var  originalExpense = angular.copy($scope.expense);
         //   $scope.report = reportsSharingSvc.getReport();

            var reportId = 0;
            if (isInReport()){
                reportId = getIdFromLocationSvc.getFirstIdFromLocation($location.path());
            }

            $scope.report = reportsSharingSvc.getReportById(reportId);

            var lastSelectedReport = $scope.report.description;

            $scope.imageSelectedPath = '';

            function getImageSuccess(result){
                // TODO result is empty
                $scope.imageSelectedPath = result.invoiceImage;
            }

            function getImageFail(errorResponse){

                errorHandlerDefaultSvc.handleError(errorResponse).then(function(){
                    resetExpense();
                });
            }

            if($scope.expense.imageType !== 'void')
            {
//                invoiceImageRepositorySvc.getImage(
//                    { 'token': localStorageSvc.getItem(sessionToken), 'expenseId': expenseId },
//                    getImageSuccess,
//                    getImageFail
//                );
//                // TODO  ???
//                $scope.imageSelectedPath = 'image';
            }

            function addExpenseSuccess(){
                debugger;
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
                    debugger;
                    expenseSharingSvc.updateExpense(expense, reportId);

                    function deleteExpenseSuccess(){
                        debugger;
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
                        debugger;
                        if (lastSelectedReport !== $scope.report.description){
                            debugger;
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
                            debugger;
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

//                    editSaveExpenseDialogSvc.openSuccessEditExpenseDialog($scope.report.description).then(function(url){
//                        $location.path(url);
//                    });
                }

                function saveExpenseError(errorResponse){
                    errorHandlerDefaultSvc.handleError(errorResponse).then(function(){
                        resetExpense();
                    });
                }

                if(form.$valid)
                {
                    expense.date = $scope.expense.date;
                    var newExpense = expenseSvc.create(expense);

                    var paramsObj = { 'token': localStorageSvc.getItem(sessionToken) };

                    expensesRepositorySvc.saveExpense(paramsObj, newExpense, saveExpenseSuccess, saveExpenseError);
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
                cameraSvc.takePhoto().then(function(result){
                    $scope.imageSelectedPath = result;
                });
            };

            $scope.viewImage = function(){
                expenseViewImageSvc.open().then(function(){
                    $scope.takePhoto();
                },{});
            };

            function resetExpense(){
               $scope.expense =  angular.copy(originalExpense);
            }

            function isInReport(){
                return $location.path().indexOf('report-details') > -1;
            }
        }
]);