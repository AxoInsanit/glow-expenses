'use strict';

angular.module('Modals').factory('itemsSelectionDialogSvc', ['$modal', function($modal){

        function open(entities, entityName, titleKey) {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/items-selection-dialog.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {
                    $scope.entities = entities;
                    $scope.titleKey = titleKey;
                    $scope.searchedEntity = null;
                    $scope.selectedEntity = null;
                    $scope.entityName = entityName;
                    $scope.limitTo = 10;

                    $scope.selectEntity = function(entity) {
                        $scope.selectedEntity = entity;
                        $modalInstance.close($scope.selectedEntity);
                    };


                    $scope.close = function() {
                        $modalInstance.close($scope.selectedEntity);
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
