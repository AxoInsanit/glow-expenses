'use strict';

angular.module('Modals').factory('cameraSelectDialog', ['$modal', 'cameraSvc',  function($modal,
    cameraSvc){

       
        function open() {

            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/camera-select-dialog.html',
                size: 'sm',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                    $scope.camera = function() {
                        cameraSvc.setSource('camera');
                        $modalInstance.close('true');
                    };

                    $scope.galery = function() {
                        cameraSvc.setSource('library');
                        $modalInstance.close('true');
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
