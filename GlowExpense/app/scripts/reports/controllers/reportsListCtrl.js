'use strict';

angular.module('Reports')
    .controller('ReportsListCtrl', function ($scope, reportResource, $stateParams, transitionService, errorDialogSvc) {

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
                    reports.forEach(function (report) {
                        $scope.reports.push(report);
                    });
                });
            }
        };

        reportResource.getReports().then(function (reports) {
            $scope.reports = reports;
        });


    }
);
