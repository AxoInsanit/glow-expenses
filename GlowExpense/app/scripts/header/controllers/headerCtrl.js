'use strict';

angular.module('Header')
    .controller('HeaderCtrl', ['$scope', '$filter', '$location',
        function ($scope, $filter, $location) {
        	//change witch one of the top is active
            $scope.isActive = function (viewLocation) { 
                return viewLocation === $location.path();
            };

			$scope.addExpense = function() {
                $location.path('/add-expense');
            };

            $scope.openProfile = function() {
                if (confirm("her emust be modal. Press yes to act like Sign out!") == true) {
                    alert("You are loged out!");
                    localStorage.setItem("session-token",undefined);
                    $location.path('/login');
                } else {
                    alert("You pressed Cancel!");
                }
            };
		}]);
