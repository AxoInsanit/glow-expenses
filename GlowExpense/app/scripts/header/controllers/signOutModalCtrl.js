var SignOutModalCtrl = function ($scope, $modalInstance, items, expensesRepositorySvc, $location) {
	$scope.profileName = localStorage.getItem("userName");
  	$scope.ok = function () {
	  	localStorage.setItem("session-token",null)
	  	$location.path('/login');
	  	$modalInstance.dismiss('cancel');
  	};
  
};