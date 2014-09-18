'use strict';

angular.module('Modals').factory('signOutDialogSvc', ['$modal', 'loginPath',
    function($modal, loginPath){

        function open() {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/sign-out-dialog.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                    $scope.$on('$locationChangeStart', function(event) {
                        $modalInstance.close('true');
                    });
                    
                    $scope.profileName = localStorage.getItem('userName');

                    $scope.ok = function() {
                        $modalInstance.close(loginPath);
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