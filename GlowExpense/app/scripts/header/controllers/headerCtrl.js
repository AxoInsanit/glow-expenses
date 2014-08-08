'use strict';

angular.module('Header')
    .controller('HeaderCtrl', ['$scope', '$filter', '$location', '$modal',
        function ($scope, $filter, $location, $modal) {
            //check are we at edit mode
            $scope.editMode = false;
            //change witch one of the top is active
            $scope.isActive = function (viewLocation) {
                return viewLocation === $location.path();
            };

            $scope.addExpense = function() {
                $location.path('/add-expense');
            };

            $scope.openEditMode = function() {
                //TODO: Add edit functionality ( green dot at front and )
                $scope.editMode=!$scope.editMode;
                $scope.$emit('EditList', $scope.editMode);
            };

            $scope.openProfile = function() {
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
