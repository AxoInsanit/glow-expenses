'use strict';

angular.module('Modals').factory('sendReportDialogSvc', ['$modal',
    function($modal){

        function open(reportName) {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/send-report-dialog.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                    $scope.$on('$locationChangeStart', function() {
                        $modalInstance.close('true');
                    });
                    
                    $scope.reportName = reportName;

                    $scope.ok = function() {
                        $modalInstance.close('ok');
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