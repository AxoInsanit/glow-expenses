'use strict';

angular.module('Header')
    .controller('HeaderCtrl', function ($scope, $location, $modal, editModeNotificationChannelSvc, signOutDialogSvc,
                                        $rootElement) {

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
            });
        };

        $scope.viewReports = function () {
          $location.path('/reports');
        };

        $scope.viewExpenses = function () {
            $rootElement.addClass('backAnimation');
            $location.path('/expenses');
        };
    });
