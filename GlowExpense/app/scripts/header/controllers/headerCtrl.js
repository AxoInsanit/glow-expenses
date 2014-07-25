'use strict';

angular.module('Header')
    .controller('HeaderCtrl', ['$scope', '$filter', '$location',
        function ($scope, $filter, $location) {
			$scope.active = true;
			$scope.switch = function(){
				$scope.active=!$scope.active;
			}
			$scope.addExpense = function() {
                $location.path('/add-expense');
            };
		}]);
