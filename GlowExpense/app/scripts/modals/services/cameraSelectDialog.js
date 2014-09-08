'use strict';

angular.module('Modals').factory('cameraSelectDialog', ['$modal', 'cameraSvc',  function($modal,
    cameraSvc){

       
        function open(entityName) {

            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/camera-select-dialog.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                    $scope.entityName = entityName;

                    $scope.camera = function() {
                        cameraSvc.setSource('camera');
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.galery = function() {
                        cameraSvc.setSource('library');
                        $modalInstance.dismiss('cancel');
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
