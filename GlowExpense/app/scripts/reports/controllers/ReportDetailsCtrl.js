'use strict';

angular.module('Reports')
    .controller('ReportDetailsCtrl', ['$scope', '$location', 'addReportErrorMsg', 'reportsSharingSvc',
        'reportExpensesSvc', 'editExpenseSvc', 'expensesRepositorySvc', 'expensesBufferingSvc', 'confirmDeleteDialogSvc',
        'entityName', 'sendReportDialogSvc', 'editExpensePath', 'expenseSvc', 'editModeNotificationChannelSvc',
        function ($scope, $location, addReportErrorMsg, reportsSharingSvc, reportExpensesSvc,
                  editExpenseSvc, expensesRepositorySvc, expensesBufferingSvc, confirmDeleteDialogSvc, entityName,
                  sendReportDialogSvc, editExpensePath, expenseSvc, editModeNotificationChannelSvc)  {

            $scope.errorMessage = addReportErrorMsg;
            $scope.showErrorMessage = false;
            $scope.expenses = [];
            $scope.isEditMode = false;

            $scope.report = reportsSharingSvc.getReport();

            expensesBufferingSvc.getExpenses($scope.report.expenseReportId).then(function (result) {
                result.forEach(function (item) {
                    $scope.expenses.push(item);
                });
            });

            $scope.openEditMode = function() {

              $scope.isEditMode = !$scope.isEditMode;
              editModeNotificationChannelSvc.toggleEditMode($scope.isEditMode);
            };

            // TODO remove this when real services are implemented
            var firstLoad = true;

            $scope.getMoreExpenses = function () {

                // TODO remove this when real services are implemented
                if (firstLoad) {
                    firstLoad = false;
                    return;
                }

                expensesBufferingSvc.getMoreExpenses($scope).then(function (result) {
                    result.forEach(function (item) {
                        $scope.expenses.push(expenseSvc.getExpense($scope, item));
                    });

                });
            };

            $scope.deleteExpense = function(expenseId){
                confirmDeleteDialogSvc.open(entityName).then(function(){
                    // TODO uncomment when service is working with params
//                            expensesRepositorySvc.deleteExpense(
//                                {
//                                    expenseId: expenseId,
//                                    token: localStorage.getItem('session-token')
//                                }
//                            ).$promise.then(function(){
//                                    $scope.expenses = $scope.expenses.filter(function (expense) {
//                                        return expense.expenseId !== expenseId;
//                                    });
//                            });

                    $scope.expenses = $scope.expenses.filter(function (expense) {
                        return expense.expenseId !== expenseId;
                    });
                });
            };

            $scope.sendReport = function(){
                sendReportDialogSvc.open($scope.report.description);
            };

            $scope.editExpense = function(expense) {
                if(!$scope.isEditMode)
                {
                    editExpenseSvc.setExpenseForEdit(expense);
                    reportsSharingSvc.setReport($scope.report);
                    $location.path('/edit-expense');
                }
            };
        }
    ]);