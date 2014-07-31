'use strict';

angular.module('Expenses').controller('deleteExpModalCtrl', ['$scope', '$modalInstance', 'item', '$location',
        function ($scope, $modalInstance, item, $location) {
        	function onFetchSuccess() {
                $modalInstance.dismiss('cancel');
            }

            function onFetchFail() {
                $modalInstance.dismiss('cancel');
            }

            function onSuccess() {
                item.expensesRepositorySvc.getExpenses(null, onFetchSuccess, onFetchFail);
            }

            function onFail() {
                alert("Could not connect");
                $modalInstance.dismiss('cancel');
            }

            $scope.ok = function () {
                item.expensesRepositorySvc.deleteExpense({"token":localStorage.getItem("session-token"),"expenseId":item.expenseId.expenseId}, onSuccess, onFail);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
              
        }
]);