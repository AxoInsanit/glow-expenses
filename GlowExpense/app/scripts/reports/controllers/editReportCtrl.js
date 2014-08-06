'use strict';

angular.module('Reports')
    .controller('EditReportCtrl', ['$scope', '$filter', '$location', 'addReportErrorMsg', 'reportSharingSvc',
        function ($scope, $filter, $location, addReportErrorMsg,reportSharingSvc)  {
            $scope.errorMessage = addReportErrorMsg;
            $scope.showErrorMessage = false;

            $scope.report = reportSharingSvc.getReport().data;
          debugger;           

        }
    ]);