'use strict';

angular.module('Reports')
    .controller('ViewReportCtrl', ['$scope', '$filter', '$location', 'addReportErrorMsg',
        function ($scope, $filter, $location, addReportErrorMsg)  {
            $scope.errorMessage = addReportErrorMsg;
            $scope.showErrorMessage = false;

            $scope.createExpense = function() {
             	$location.path('/add-expense');
            };

        }
    ]);