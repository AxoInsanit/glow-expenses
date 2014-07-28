'use strict';

angular.module('Header')
    .controller('HeaderCtrl', ['$scope', '$filter', '$location',
        function ($scope, $filter, $location) {
        	//change witch one of the top is active
        	if($location.$$path.indexOf("report")>0)
        	{
        		$scope.active = false;
        	}
        	else
        	{
        		$scope.active = true;
        	}
        	//change should be the green plus visible
			if($location.$$path.indexOf("expenses")>0)
        	{
        		$scope.isExpenses = true;
        	}
        	else
        	{
        		$scope.isExpenses = false;
        	}
			$scope.switch = function(){
				$scope.active =! $scope.active;
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
