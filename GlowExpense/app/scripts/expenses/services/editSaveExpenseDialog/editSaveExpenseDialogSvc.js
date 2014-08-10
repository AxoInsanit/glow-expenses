'use strict';

angular.module('Expenses').factory('editSaveExpenseDialogSvc', ['$modal', 'expensesPath', 'reportsPath',
    function($modal, expensesPath, reportsPath){

        function openSuccessEditExpenseDialog(reportName) {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/expenses/services/editSaveExpenseDialog/edit-expense-dialog.html',
                controller: function($scope, $modalInstance) {

                    $scope.reportName = reportName;

                    $scope.navigateToReports = function() {
                        $modalInstance.close(reportsPath);
                    };

                    $scope.navigateToExpensesList = function() {
                        $modalInstance.close(expensesPath);
                    };
                }
            });

            return modalInstance.result.then(function(response) {
                return response;
            });
        }

        function openSuccessSaveExpenseDialog() {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/expenses/services/editSaveExpenseDialog/save-expense-dialog.html',
                controller: function($scope, $modalInstance) {

                    $scope.ok = function() {
                        $modalInstance.close('ok');
                    };
                }
            });

            return modalInstance.result.then(function(response) {
                return response;
            });
        }

        return {
            openSuccessEditExpenseDialog: openSuccessEditExpenseDialog,
            openSuccessSaveExpenseDialog: openSuccessSaveExpenseDialog
        };
    }
]);
