'use strict';

angular.module('Services').factory('confirmDeleteDialogSvc', ['$modal',  function($modal){

        function open(entityName) {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/services/confirmDeleteDialog/confirm-delete-dialog.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                    $scope.entityName = entityName;

                    $scope.ok = function() {
                        $modalInstance.close("true");
                    };

                    $scope.cancel = function() {
                        $modalInstance.dismiss("false");
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
