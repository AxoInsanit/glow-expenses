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
		}]);
