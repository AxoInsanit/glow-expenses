'use strict';

var expenseTypeModalCtrl = function ($scope, $modalInstance, expenseTypes) {

	$scope.expenses = expenseTypes.types;
	$scope.target = expenseTypes.target;

	$scope.chousen = function (expense) {
		//change the input value
		$($scope.target).html(expense.name);
		$.grep($scope.expenses, function(item){
	      if( item.selected === true );
	      	item.selected = false;
	    });
		expense.selected = true;
		$modalInstance.dismiss(expense);
  	};
};