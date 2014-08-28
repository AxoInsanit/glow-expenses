'use strict';

angular.module('Reports')
    .controller('EditReportExpenseCtrl', ['$scope', '$location', 'getIdFromLocationSvc',
        function ($scope, $location, getIdFromLocationSvc)  {

            $scope.reportId = getIdFromLocationSvc.getFirstIdFromLocation($location.path());
        }
    ]);