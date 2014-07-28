'use strict';

angular.module('Reports')
    .controller('ReportsCtrl', ['$scope', '$filter', '$location',
        function ($scope, $filter, $location)  {
            $scope.isMain = true;
            $scope.createReport = function() {
                $location.path('/create-report');
            };

        }
    ]);