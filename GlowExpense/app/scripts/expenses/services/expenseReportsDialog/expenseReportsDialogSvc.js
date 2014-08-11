'use strict';

angular.module('Expenses').factory('expenseReportsDialogSvc', ['$modal', 'reportsSharingSvc', 'filterReportByStateSvc',
    function($modal, reportsSharingSvc, filterReportByStateSvc){

        function open() {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/expenses/services/expenseReportsDialog/expense-reports-dialog.html',
                controller: function($scope, $modalInstance) {

                    $scope.reports = [];
                    $scope.searchedReport = null;

                    reportsSharingSvc.getReports().then(function(response){
                        $scope.reports = response.filter(filterReportByStateSvc.checkIfInState);
                    });

                    $scope.selectReport = function(report) {
                        $modalInstance.close(report);
                    };
                }
            });

            return modalInstance.result.then(function(response) {
                return response;
            });
        }

        return {
            open: open
        };
    }
]);
