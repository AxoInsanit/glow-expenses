'use strict';

angular.module('Header')
    .controller('HeaderCtrl', ['$scope', '$filter', '$location',
        function ($scope, $filter, $location) {
        	if($location.$$path.indexOf("report")>0)
        	{
        		$scope.active = false;
        	}
        	else
        	{
        		$scope.active = true;
        	}
			
			$scope.switch = function(){
				$scope.active=!$scope.active;
				if($scope.active === false)
				{
					$location.path('/reports');
				}
				else
				{
					$location.path('/expenses');
				}
			};
			$scope.addExpense = function() {
                $location.path('/add-expense');
            };
		}]);
