'use strict';
/*global alert */

angular.module('Reports')
    .controller('ReportsCtrl', ['$scope', '$filter', '$location', '$modal', 'reportsSharingSvc',
        'editModeNotificationChannelSvc', 'reportsRepositorySvc', 'filterReportByStateSvc',
            function ($scope, $filter, $location, $modal, reportsSharingSvc, editModeNotificationChannelSvc,
                      reportsRepositorySvc, filterReportByStateSvc)  {

            $scope.goToExpenses = function(){
                $location.path('/expenses');
            };

            reportsSharingSvc.getReports().then(function(reports){
                $scope.reportCollection = reports;
            });

            $scope.isEditMode = false;
            //when edit list is active
//            $scope.$on('EditList', function(event, args) {
//                $scope.isEditMode = args;
//            });

            function toggleEditModeHandler(isEditMode){
                $scope.isEditMode = isEditMode;
            }

            editModeNotificationChannelSvc.onEditModeToggled($scope, toggleEditModeHandler);

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
                if((!$scope.isEditMode)&&(!report.locked)&&(filterReportByStateSvc.checkIfInState(report)))
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