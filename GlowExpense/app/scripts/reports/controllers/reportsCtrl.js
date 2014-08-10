'use strict';
/*global alert */

angular.module('Reports')
    .controller('ReportsCtrl', ['$scope', '$filter', '$location', '$modal', 'reportsSharingSvc',
            function ($scope, $filter, $location, $modal, reportsSharingSvc)  {

            $scope.goToExpenses = function(){
                $location.path('/expenses');
            };

            reportsSharingSvc.getReports().then(function(reports){
                $scope.reportCollection = reports;
            });

            $scope.showEditMode = false;
            //when edit list is active
            $scope.$on('EditList', function(event, args) {
                $scope.showEditMode = args;
            });

            $scope.deleteReport = function(report) {
                $scope.reportForDeletion = report;
                var modalInstance = $modal.open({
                    templateUrl: 'deleteModal',
                    controller: 'deleteExpModalCtrl',
                    size: 'sm',
                    resolve: {}
                });
                modalInstance.result.then(function () {
                    function onSuccess(reportsRepositorySvc) {
                        reportsRepositorySvc.getReports();
                    }

                    function onFail(message) {
                        alert('Failed because: ' + message);
                    }
                    reportsRepositorySvc.deleteReports({'token':localStorage.getItem('session-token'),'expenseReportId':$scope.reportForDeletion.expenseReportId},onSuccess(reportsRepositorySvc),onFail());
                }, function () {
                });

            };

            $scope.viewReport = function(report) {
                if((!$scope.showEditMode)&&(!report.locked)&&(report.state === 'Draft Expense'))
                {
                    reportsSharingSvc.setReport(report);
                    $location.path('/view-report');
                }
            };

            $scope.createReport = function() {
                $location.path('/create-report');
            };
        }
    ]);