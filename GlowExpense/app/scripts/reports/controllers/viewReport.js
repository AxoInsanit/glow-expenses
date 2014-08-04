'use strict';

angular.module('Reports')
    .controller('ViewReportCtrl', ['$scope', '$filter', '$location', 'addReportErrorMsg',
        function ($scope, $filter, $location, addReportErrorMsg)  {
            $scope.errorMessage = addReportErrorMsg;
            $scope.showErrorMessage = false;

           // $scope.currencies = currenciesSvc.get();

           // $scope.expenseTypes = expenseTypesSvc.get();
           

        }
    ]);