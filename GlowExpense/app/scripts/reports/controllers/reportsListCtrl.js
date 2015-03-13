'use strict';

angular.module('Reports')
    .controller('ReportsListCtrl', function ($scope, reportResource, BrowserSrv, $stateParams, transitionService, errorDialogSvc) {

        $scope.viewReport = function(report) {
            transitionService.go({
                name: 'viewReport',
                params: {
                    reportId: report.expenseReportId
                },
                direction: 'forward'
            });
        };

        $scope.createReport = function () {
            transitionService.go({
                name: 'newReport',
                direction: 'forward'
            });
        };

        $scope.deleteReport = function (report, event) {
            event.stopPropagation();
            event.preventDefault();
            reportResource.removeReport(report.expenseReportId).then(function () {
                transitionService.reload();
            }, function () {
                errorDialogSvc.open('Couldn\'t remove report');
            });
        };

        $scope.getMoreReports = function() {
            if ($scope.reports) {
                reportResource.getReports(true).then(function (reports) {
                    $scope.reports = reports;
                });
            }
        };

        // Initializing the browser position.
        BrowserSrv.getScrollPos($scope);

        /*
            This listener is catching changes in the scroll position.
        */
        $scope.$on('scroll-change', function(event, data) {
            if(data.scroll>90){
                $scope.getMoreReports();
            }
        });

    }
);
