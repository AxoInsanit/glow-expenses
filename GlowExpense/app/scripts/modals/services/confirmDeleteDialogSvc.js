'use strict';

angular.module('Modals').factory('confirmDeleteDialogSvc', ['$modal',  function($modal){

        function open(entityName) {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/confirm-delete-dialog.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                    $scope.entityName = entityName;

                    $scope.$on('$locationChangeStart', function() {
                        $modalInstance.close('true');
                    });

                    $scope.ok = function() {
                        $modalInstance.close('true');
                    };

                    $scope.cancel = function() {
                        $modalInstance.dismiss('false');
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
