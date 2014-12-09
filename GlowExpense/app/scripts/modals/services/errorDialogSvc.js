'use strict';

angular.module('Modals').factory('errorDialogSvc', ['$modal', function($modal){

        function open(errorMessage) {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/error-dialog.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                    $scope.errorMessage = errorMessage;

                    $scope.$on('$locationChangeStart', function() {
                        $modalInstance.close('true');
                    });

                    $scope.ok = function() {
                        $modalInstance.close('ok');
                    };


                    // handle device's back button, close modal
                    function backButtonHandler() {
                        $modalInstance.close('ok');
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

