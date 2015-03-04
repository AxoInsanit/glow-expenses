'use strict';

angular.module('Modals').factory('signOutDialogSvc',
    function($modal, $rootScope, userResource){

        function open() {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/sign-out-dialog.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                    userResource.getGlober().then(function (glober) {
                        $scope.profileName = glober.firstname + ' ' + glober.lastname;
                    });

                    $scope.ok = function() {
                        $rootScope.$broadcast('global::signOut');
                        $modalInstance.close();
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
);
