var DeleteExpModalCtrl = function ($scope, $modalInstance, items, expensesRepositorySvc) {

  $scope.ok = function () {
  	debugger;
    expensesRepositorySvc.deleteExpense({"token":localStorage.getItem("session-token"),"expenseId":expenseId}, onSuccess, onFail);
  };

  $scope.cancel = function () {
  	debugger;
    $modalInstance.dismiss('cancel');
  };
  
};