'use strict';

angular.module('Modals').factory('cameraSelectDialog', ['$modal', 'cameraSvc', '$q',  function($modal, 
    cameraSvc,$q){

        function open(entityName) {

            var deferred = $q.defer();
            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/camera-select-dialog.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance,$q) {

                    $scope.entityName = entityName;

                    $scope.camera = function() {
                        cameraSvc.setSource('camera');
                        $modalInstance.dismiss('cancel');
                        deferred.resolve();
                    };

                    $scope.galery = function() {
                        cameraSvc.setSource('library');
                        $modalInstance.dismiss('cancel');
                        deferred.resolve();
                    };
                }]
            });

            return deferred.promise;
        }

        return {
            open: open
        };
    }
]);
