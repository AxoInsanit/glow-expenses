'use strict';

angular.module('Header')
    .controller('HeaderCtrl', ['$scope', '$location', '$modal', 'editModeNotificationChannelSvc',
        function ($scope, $location, $modal, editModeNotificationChannelSvc) {

            $scope.isEditMode = false;

            // TODO refactor this
            $scope.isActive = function (viewLocation) {
                return viewLocation === $location.path();
            };

            $scope.openEditMode = function() {
                $scope.isEditMode = !$scope.isEditMode;
                editModeNotificationChannelSvc.toggleEditMode($scope.isEditMode);
            };

            $scope.signOut = function() {
                 var modalInstance = $modal.open({
                  templateUrl: 'signOutModal',
                  controller: SignOutModalCtrl,
                  size: 'sm',
                  resolve: {
                    items: function () {
                      return $scope.items;
                    }
                  }
                });
            };
		}]);
