'use strict';
/*global alert */

angular.module('Expenses').controller('deleteExpModalCtrl', ['$scope', '$modalInstance', '$location',
        function ($scope, $modalInstance, $location) {

            $scope.location = function(){
                if($location.$$path.indexOf('report')>0)
                {
                    return 'Report';  
                }
                else
                {
                    return 'Expense'; 
                }
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