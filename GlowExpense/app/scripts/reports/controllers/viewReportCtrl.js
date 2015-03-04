'use strict';

angular.module('Reports')
    .controller('ViewReportCtrl', function ($scope, $stateParams, transitionService, reportResource, ReportModel,
                                            errorDialogSvc, sendReportDialogSvc)  {

        var reportId = $stateParams.reportId;

        if ($scope.$parent) {
            $scope.$parent.title = 'Loading...';

            // override layout back path
            $scope.$parent.backStateName = 'home';
            $scope.$parent.backStateParams = {view: 'reports'};
        }


        $scope.editExpense = function(expense) {
            transitionService.go({
                name: 'editReportExpense',
                params: {
                    expenseId: expense.expenseId,
                    reportId: reportId
                },
                direction: 'forward'
            });
        };

        $scope.createExpense = function(){
            transitionService.go({
                name: 'addReportExpense',
                params: {
                    reportId: reportId
                },
                direction: 'forward'
            });
        };

        $scope.editReport = function(){
            transitionService.go({
                name: 'editReport',
                params: {
                    reportId: reportId
                },
                direction: 'forward'
            });
        };

        $scope.sendReport = function () {
            reportResource.sendReport(reportId).then(function () {
                sendReportDialogSvc.open($scope.report.description).then(function () {
                    transitionService.go({
                        name: 'home',
                        params: {
                            view: 'reports'
                        },
                        direction: 'backward'
                    });
                });
            }, function () {
                errorDialogSvc.open('Review your expenses!');
            });
        };

        $scope.getMoreExpenses = function(){

        };

        reportResource.getReport(reportId).then(function (report) {
            reportResource.getExpenses(reportId).then(function (expenses) {
                $scope.expenses = expenses;
            });
            $scope.$parent.title = report.description;
            $scope.report = new ReportModel(report);
        });
    }
);
