'use strict';

angular.module('Expenses')
    .controller('DeleteExpModalCtrl', ['$scope',  '$modal',
        function ($scope, $modal)  {

  $scope.ok = function () {
  	debugger;
  	$scope.$emit('DeleteExpense');
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  
}]);