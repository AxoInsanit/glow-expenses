'use strict';

angular.module('Header')
    .controller('HeaderCtrl', ['$scope', '$filter', '$location',
        function ($scope, $filter, $location) {
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
                if (confirm("Here must be modal. Press yes to act like Sign out!") == true) {
                    alert("You are loged out!");
                    localStorage.setItem("session-token",undefined);
                    $location.path('/login');
                } else {
                    alert("You pressed Cancel!");
                }
            };
		}]);
