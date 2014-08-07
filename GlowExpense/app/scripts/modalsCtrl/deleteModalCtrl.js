'use strict';

angular.module('Expenses').controller('deleteExpModalCtrl', ['$scope', '$modalInstance', '$location',
        function ($scope, $modalInstance, $location) {
        	function onFetchSuccess() {
        		//when we fetch everything correctly after the delete and fetch call
                $modalInstance.dismiss('cancel');
            }
            //used if we want to handle the case when it delete but net stop and cant fetch new exp
            // function onFetchFail() {
            // 	//when we cant catch correctly after the delete and fetch call
            //     $modalInstance.dismiss('cancel');
            // }

            // function onSuccess() {
            // 	//when we delete correctly and fetch call
            //     item.expensesRepositorySvc.getExpenses(null, onFetchSuccess, onFetchFail);
            // }
            $scope.location = function(){
                if($location.$$path.indexOf("report")>0)
                    return "Report";
                else
                    return "Expense";
            };


            function onFail() {
            	//when we fail delete 
                alert("Could not connect");
                $modalInstance.dismiss('cancel');
            };

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