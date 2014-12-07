'use strict';

angular.module('Modals').factory('editSaveExpenseDialogSvc', ['$modal', 'expensesPath', 'reportsPath', 'reportDetailsPath',
    function($modal, expensesPath, reportsPath, reportDetailsPath){

        function openSuccessEditExpenseDialog(reportName) {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/edit-expense-dialog.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                    $scope.reportName = reportName;

                    $scope.$on('$locationChangeStart', function() {
                        $modalInstance.close('true');
                    });

                    $scope.navigateToReports = function() {
                        $modalInstance.close(reportsPath);
                    };

                    $scope.navigateToExpensesList = function() {
                        $modalInstance.close(expensesPath);
                    };

                    // handle device's back button, close modal
                    function backButtonHandler() {
                        $modalInstance.dismiss('canceled');
                    }

                    document.addEventListener('backbutton', backButtonHandler);

                    // on modal close remove handler
                    $scope.$on('$destroy', function () {
                        document.removeEventListener('backbutton', backButtonHandler);
                    });
                }]
            });

            return modalInstance.result.then(function(response) {
                return response;
            });
        }

        function openSuccessSaveExpenseDialog() {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/save-expense-dialog.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                    $scope.navigateToReport = function() {
                        $modalInstance.close(reportDetailsPath);
                    };

                    // handle device's back button, close modal
                    function backButtonHandler() {
                        $modalInstance.dismiss('canceled');
                    }

                    document.addEventListener('backbutton', backButtonHandler);

                    // on modal close remove handler
                    $scope.$on('$destroy', function () {
                        document.removeEventListener('backbutton', backButtonHandler);
                    });
                }]
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
