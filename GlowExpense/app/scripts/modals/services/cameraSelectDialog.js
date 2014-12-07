'use strict';

angular.module('Modals').factory('cameraSelectDialog', function($modal, cameraSvc){



        function open() {

            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/camera-select-dialog.html',
                size: 'sm',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                    $scope.$on('$locationChangeStart', function() {
                        $modalInstance.close('true');
                    });

                    $scope.camera = function() {
                        cameraSvc.setSource('camera');
                        $modalInstance.close('true');
                    };

                    $scope.gallery = function() {
                        cameraSvc.setSource('library');
                        $modalInstance.close('true');
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
);
