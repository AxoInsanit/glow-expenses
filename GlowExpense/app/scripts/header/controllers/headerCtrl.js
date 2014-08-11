'use strict';

angular.module('Header')
    .controller('HeaderCtrl', ['$scope', '$location', '$modal', 'editModeNotificationChannelSvc', 'signOutDialogSvc',
        function ($scope, $location, $modal, editModeNotificationChannelSvc, signOutDialogSvc) {

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
                signOutDialogSvc.open().then(function(url){
                    $location.path(url);
                })
            };
		}]);
