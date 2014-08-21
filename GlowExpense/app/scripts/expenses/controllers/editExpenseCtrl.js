'use strict';

angular.module('Expenses')
    .controller('EditExpenseCtrl', ['$scope', '$location', 'editExpensesTitle', 'editExpensesButtonLabel', 'expenseSharingSvc',
        'cameraSvc', 'reportsRepositorySvc', 'currencySelectDialogSvc', 'expensesRepositorySvc', 'editSaveExpenseDialogSvc',
        'expenseViewImageSvc', 'reportsSharingSvc', 'reportEntityName', 'filterReportByStateSvc',
        'itemsSelectionDialogSvc', 'reportExpensesRepositorySvc', 'localStorageSvc', 'sessionToken', 'reportDetailsPath',
        'expensesPath', 'invoiceImageRepositorySvc',
        function ($scope,  $location, editExpensesTitle, editExpensesButtonLabel, expenseSharingSvc, cameraSvc,
                  reportsRepositorySvc, currencySelectDialogSvc, expensesRepositorySvc, editSaveExpenseDialogSvc,
                  expenseViewImageSvc, reportsSharingSvc, reportEntityName, filterReportByStateSvc,
                  itemsSelectionDialogSvc, reportExpensesRepositorySvc, localStorageSvc, sessionToken, reportDetailsPath,
                expensesPath, invoiceImageRepositorySvc) {

            $scope.title = editExpensesTitle;
            $scope.buttonLabel = editExpensesButtonLabel;
            $scope.showErrorMessage = false;
            $scope.showServerErrorMessage = false;

            $scope.expense = expenseSharingSvc.getExpenseForEdit();
            var  originalExpense = angular.copy($scope.expense);

            $scope.report = reportsSharingSvc.getReport();
            var lastSelectedReport = $scope.report.description;

            $scope.imageSelectedPath = '';

            function getImageSuccess(result){
                $scope.imageSelectedPath = result.invoiceImage;
            }

            function getImageFail(){

            }

            if($scope.expense.imageType !== 'void')
            {
                invoiceImageRepositorySvc.getImage(
                    {},
                    getImageSuccess,
                    getImageFail
                );
            }

            function addExpenseSuccess(){
                reportsSharingSvc.setReport($scope.report);
                $location.path(reportDetailsPath);
            }

            function addExpenseFail(){
                $scope.showServerErrorMessage = true;
                resetExpense();
            }

            var reportObj = {
                'expenseReportId': $scope.report.expenseReportId,
                'expenseIds': [$scope.expense.expenseId]
            };

            $scope.save = function(form, expense) {
                function saveExpenseSuccess(){

                    function deleteExpenseSuccess(){

                        reportExpensesRepositorySvc.addExpensesToReport(
                            reportObj,
                            addExpenseSuccess,
                            addExpenseFail
                        );
                    }

                    function deleteExpenseFail(){
                        $scope.showServerErrorMessage = true;
                        resetExpense();
                    }

                    // expense was just assigned to a report
                    if (!lastSelectedReport && $scope.report.description){

                        reportExpensesRepositorySvc.addExpensesToReport(
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
                                    'token': localStorageSvc.setItem(sessionToken),
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
                                addExpenseSuccess();
                            }
                            // it is unassigned go to expenses list
                            else {
                                $location.path(expensesPath);
                            }
                        }
                    }

                    editSaveExpenseDialogSvc.openSuccessEditExpenseDialog($scope.report.description).then(function(url){
                        $location.path(url);
                    });
                }

                function saveExpenseError(){
                    $scope.showServerErrorMessage = true;
                    resetExpense();
                }

                if(form.$valid)
                {
                    expense.date = $scope.expense.date;

                    expensesRepositorySvc.saveExpense(expense, saveExpenseSuccess, saveExpenseError);
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
        }
]);