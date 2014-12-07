'use strict';

angular.module('Modals').factory('itemsSelectionDialogSvc', ['$modal', function($modal){

        function open(entities, entityName) {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/items-selection-dialog.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                    $scope.entities = entities;
                    $scope.searchedEntity = null;
                    $scope.selectedEntity = null;
                    $scope.entityName = entityName;
                    $scope.limitTo = 10;

                    $scope.$on('$locationChangeStart', function() {
                        $modalInstance.close('true');
                    });

                    $scope.selectEntity = function(entity) {
                        $scope.selectedEntity = entity;
                        $modalInstance.close($scope.selectedEntity);
                    };


                    $scope.close = function() {
                        $modalInstance.close($scope.selectedEntity);
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
