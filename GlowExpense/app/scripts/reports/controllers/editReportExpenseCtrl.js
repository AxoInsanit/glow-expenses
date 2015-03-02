'use strict';

angular.module('Reports')
    .controller('EditReportExpenseCtrl', function ($scope, $routeParams)  {
        $scope.reportId = $routeParams.reportId;
    }
);
