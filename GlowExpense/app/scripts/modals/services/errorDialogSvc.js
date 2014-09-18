'use strict';

angular.module('Modals').factory('errorDialogSvc', ['$modal', function($modal){

        function open(errorMessage) {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/error-dialog.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                    $scope.errorMessage = errorMessage;

                    $scope.$on('$locationChangeStart', function(event) {
                        $modalInstance.close('true');
                    });

                    $scope.ok = function() {
                        $modalInstance.close('ok');
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

