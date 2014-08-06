var editSaveCtrl = function ($scope, $modalInstance, data, $location) {

	if($location.$$path.indexOf("edit")>0)
	{
		$scope.text = 'edited';
	}
	else
	{
		$scope.text = 'added to '+data.report.description;
	}


	$scope.goToReports = function(){
		$location.path('/reports');
		$modalInstance.dismiss('cancel');
	};

	$scope.goToExpensesList = function(){
		$location.path('/expenses');
		$modalInstance.dismiss('cancel');
	};
};