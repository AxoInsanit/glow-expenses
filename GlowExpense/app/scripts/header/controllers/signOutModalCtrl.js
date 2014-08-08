'use strict';

var SignOutModalCtrl = function ($scope, $modalInstance, items, expensesRepositorySvc, $location) {
	$scope.profileName = localStorage.getItem('userName');
		$scope.ok = function() {
		//null the token , go to login and dismiss modal
		localStorage.setItem('session-token',null);
		$location.path('/login');
		$modalInstance.dismiss('cancel');
	};
};