'use strict';

var expenseCurrencyModalCtrl = function ($scope, $modalInstance, currencies) {

	$scope.currencies = currencies.types;
	$scope.target = currencies.target;

	$scope.chousen = function (currencie) {
		//change the input value
		$($scope.target).html(currencie.name);
		
		$.grep($scope.currencies, function(item){
	      if( item.selected === true )
			item.selected = false;
	    });
		currencie.selected = true;
		$modalInstance.dismiss('cancel');
  	};
};