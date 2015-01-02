'use strict';

angular.module('Modals').factory('signOutDialogSvc',
    function($modal, loginPath, sessionToken, localStorageSvc){

        function open() {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/sign-out-dialog.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                    $scope.$on('$locationChangeSuccess', function() {
                        if ($modalInstance) {
                            $modalInstance.dismiss('cancelled');
                        }
                    });

                    $scope.profileName = localStorage.getItem('userName');

                    $scope.ok = function() {
                        localStorageSvc.removeItem(sessionToken);
                        $modalInstance.close(loginPath);
                    };

                    // handle device's back button, close modal
                    function backButtonHandler() {
                        $modalInstance.dismiss('cancelled');
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
);
