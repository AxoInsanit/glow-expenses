'use strict';

angular.module('Reports')
    .controller('ReportDetailsCtrl', ['$scope', '$location', 'addReportErrorMsg', 'reportsSharingSvc',
        'reportExpensesSvc', 'expenseSharingSvc', 'expensesRepositorySvc', 'expensesBufferingSvc', 'confirmDeleteDialogSvc',
        'entityName', 'sendReportDialogSvc', 'editExpensePath', 'expenseSvc', 'editModeNotificationChannelSvc',
        'sessionToken',
        function ($scope, $location, addReportErrorMsg, reportsSharingSvc, reportExpensesSvc,
                  expenseSharingSvc, expensesRepositorySvc, expensesBufferingSvc, confirmDeleteDialogSvc, entityName,
                  sendReportDialogSvc, editExpensePath, expenseSvc, editModeNotificationChannelSvc, sessionToken)  {

            $scope.errorMessage = addReportErrorMsg;
            $scope.showErrorMessage = false;
            $scope.expenses = [];
            $scope.isEditMode = false;

            $scope.report = reportsSharingSvc.getReport();
            $scope.report.expenseIds = [];

            expensesBufferingSvc.getExpenses($scope.report.expenseReportId).then(function (result) {
                result.forEach(function (item) {
                    $scope.expenses.push(item);
                    $scope.report.expenseIds.push(item.expenseId);
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

            $scope.sendReport = function(){
                sendReportDialogSvc.open($scope.report.description);
            };

            $scope.editExpense = function(expense) {
                if(!$scope.isEditMode)
                {
                    expenseSharingSvc.setExpenseForEdit(expense);
                    reportsSharingSvc.setReport($scope.report);
                    $location.path(editExpensePath);
                }
            };
        }
    ]);