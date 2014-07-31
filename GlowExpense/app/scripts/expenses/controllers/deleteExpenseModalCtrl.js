'use strict';

angular.module('Expenses').controller('deleteExpModalCtrl', ['$scope', '$modalInstance', 'item', '$location',
        function ($scope, $modalInstance, item, $location) {
        	function onFetchSuccess() {
                alert("Succesfully deleted the expense and reload the page");
                $modalInstance.dismiss('cancel');
            }

            function onFetchFail() {
                alert("The expense was deleted but could not fetch the new list");
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