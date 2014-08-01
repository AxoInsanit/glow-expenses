'use strict';

angular.module('Expenses').controller('deleteExpModalCtrl', ['$scope', '$modalInstance', '$location',
        function ($scope, $modalInstance, $location) {
        	function onFetchSuccess() {
        		//when we fetch everything correctly after the delete and fetch call
                $modalInstance.dismiss('cancel');
            }

            // function onFetchFail() {
            // 	//when we cant catch correctly after the delete and fetch call
            //     $modalInstance.dismiss('cancel');
            // }

            // function onSuccess() {
            // 	//when we delete correctly and fetch call
            //     item.expensesRepositorySvc.getExpenses(null, onFetchSuccess, onFetchFail);
            // }

            function onFail() {
            	//when we fail delete 
                alert("Could not connect");
                $modalInstance.dismiss('cancel');
            }

            $scope.ok = function () {
            	//when we click ok
                $modalInstance.close();
            };

            $scope.cancel = function () {
            	//when we click cancel
                $modalInstance.dismiss('cancel');
            };
              
        }
]);