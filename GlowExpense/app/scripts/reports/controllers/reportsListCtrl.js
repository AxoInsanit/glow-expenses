'use strict';

angular.module('Reports')
    .controller('ReportsListCtrl', function ($scope, reportResource, BrowserSrv, $stateParams, transitionService, confirmDeleteDialogSvc, errorDialogSvc, localStorageSvc) {

        var email = JSON.parse(localStorageSvc.getItem('glober')).email,
            configuration = JSON.parse(localStorageSvc.getItem(email));
        $scope.hidePaidReports = configuration.hidePaid ? configuration.hidePaid : false;

        $scope.scrollPosition = 0;

        $scope.saveConfiguration = function(){
            var newConfig = JSON.parse(localStorageSvc.getItem(email));

            newConfig.hidePaid = $scope.hidePaidReports;
            localStorageSvc.setItem(email,JSON.stringify(newConfig));
        };

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

            confirmDeleteDialogSvc.open('report').then(function(){
                reportResource.removeReport(report.expenseReportId).then(function () {
                    transitionService.reload();
                }, function () {
                    errorDialogSvc.open('Couldn\'t remove report');
                });
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
