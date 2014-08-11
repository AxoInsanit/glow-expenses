'use strict';

angular.module('Modals').factory('sendReportDialogSvc', ['$modal',
    function($modal){

        function open(reportName) {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/send-report-dialog.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                    $scope.reportName = reportName;

                    $scope.ok = function() {
                        $modalInstance.close(loginPath);
                    };
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