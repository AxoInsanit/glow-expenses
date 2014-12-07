'use strict';

angular.module('Modals').factory('expenseReportsDialogSvc', ['$modal', 'reportsSharingSvc', 'filterReportByStateSvc',
    function($modal, reportsSharingSvc, filterReportByStateSvc){

        function open() {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/expense-reports-dialog.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                    $scope.reports = [];
                    $scope.searchedReport = null;

                    $scope.$on('$locationChangeStart', function() {
                        $modalInstance.close('true');
                    });

                    reportsSharingSvc.getReports().then(function(response){
                        $scope.reports = response.filter(filterReportByStateSvc.checkIfInState);
                    });

                    $scope.selectReport = function(report) {
                        $modalInstance.close(report);
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
            open: open
        };
    }
]);
