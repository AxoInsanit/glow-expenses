'use strict';

angular.module('Expenses').factory('expenseReportsDialogSvc', ['$modal', 'reportsSharingSvc', 'filterReportByStateSvc',
    function($modal, reportsSharingSvc, filterReportByStateSvc){

        function open() {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/expenses/services/expenseReportsDialog/expense-reports-dialog.html',
                controller: function($scope, $modalInstance) {

                    $scope.reports = [];
                    $scope.searchedReport = null;

//                    var statesWhiteList = [
//                        'Draft Expense',
//                        'Rejected by Finance',
//                        'Rejected by Manager',
//                        'Rejected to Submitter'
//                    ];
//
//                    function checkIfInState(report){
//                        var result = statesWhiteList.indexOf(report.state) > -1;
//                        return result;
//                    }

                    reportsSharingSvc.getReports().then(function(response){
                        $scope.reports = response.filter(filterReportByStateSvc.checkIfInState);

                        debugger;
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
