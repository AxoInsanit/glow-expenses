'use strict';
/*global alert */

angular.module('Reports')
    .controller('ReportsCtrl', ['$scope', '$filter', '$location', '$modal', 'reportsSharingSvc',
        'editModeNotificationChannelSvc', 'reportsRepositorySvc', 'filterReportByStateSvc', 'entityName',
        'confirmDeleteDialogSvc',
            function ($scope, $filter, $location, $modal, reportsSharingSvc, editModeNotificationChannelSvc,
                      reportsRepositorySvc, filterReportByStateSvc, entityName, confirmDeleteDialogSvc)  {

            reportsSharingSvc.getReports().then(function(reports){
                $scope.reportCollection = reports;
            });

            $scope.isEditMode = false;

            function toggleEditModeHandler(isEditMode){
                $scope.isEditMode = isEditMode;
            }

            editModeNotificationChannelSvc.onEditModeToggled($scope, toggleEditModeHandler);

            $scope.deleteReport = function(report) {

                confirmDeleteDialogSvc.open(entityName).then(function(){
                    // TODO uncomment when service is working with params
//                    reportsRepositorySvc.deleteExpense(
//                        {
//                            'token':localStorage.getItem('session-token'),
//                            'expenseReportId': report.expenseReportId
//                        }
//                    ).$promise.then(function(){
//                            $scope.reportCollection = $scope.reportCollection.filter(function (item) {
//                                return item.expenseReportId !== report.expenseReportId;
//                            });
//                    });

                    $scope.reportCollection = $scope.reportCollection.filter(function (item) {
                        return item.expenseReportId !== report.expenseReportId;
                    });
                });
            };

            $scope.viewReport = function(report) {
                if((!$scope.isEditMode) && (!report.locked) && (filterReportByStateSvc.checkIfInState(report)))
                {
                    reportsSharingSvc.setReport(report);
                    $location.path('/view-report');
                }
            };
        }
    ]);