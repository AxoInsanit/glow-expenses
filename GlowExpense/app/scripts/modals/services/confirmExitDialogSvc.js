'use strict';

angular.module('Modals').factory('confirmExitDialogSvc', ['$modal',  function($modal){

        function open(entityName) {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/confirm-exit-dialog.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                    $scope.entityName = entityName;

                    $scope.ok = function() {
                        navigator.app.exitApp();
                    };

                    $scope.cancel = function() {
                        $modalInstance.dismiss('false');
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
