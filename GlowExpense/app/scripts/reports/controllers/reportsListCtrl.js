'use strict';

angular.module('Reports')
    .controller('ReportsListCtrl', ['$scope', '$location', 'reportsSharingSvc',
        'editModeNotificationChannelSvc', 'reportsRepositorySvc', 'filterReportByStateSvc', 'entityName',
        'confirmDeleteDialogSvc', 'reportDetailsPath', 'sessionToken',
            function ($scope, $location, reportsSharingSvc, editModeNotificationChannelSvc,
                      reportsRepositorySvc, filterReportByStateSvc, entityName, confirmDeleteDialogSvc,
                      reportDetailsPath, sessionToken)  {

            reportsSharingSvc.getReports().then(function(reports){
                $scope.reports = reports;
            });

            $scope.isEditMode = false;

            function toggleEditModeHandler(isEditMode){
                $scope.isEditMode = isEditMode;
            }

            editModeNotificationChannelSvc.onEditModeToggled($scope, toggleEditModeHandler);

            $scope.createReport = function(){
                reportsSharingSvc.setReport();
                $location.path('/create-report');
            };

            $scope.deleteReport = function(report) {

                function deleteReportSuccess(){
                    $scope.reports = $scope.reports.filter(function (item) {
                        return item.expenseReportId !== report.expenseReportId;
                    });
                }

                function deleteReportFail(){

                }

                confirmDeleteDialogSvc.open(entityName).then(function(){
                    reportsRepositorySvc.deleteReport(
                        {
                            'token':localStorage.getItem(sessionToken),
                            'expenseReportId': report.expenseReportId
                        },
                        deleteReportSuccess,
                        deleteReportFail
                    );
                });
            };

            $scope.viewReport = function(report) {
                if((!$scope.isEditMode) && (!report.locked) && (filterReportByStateSvc.checkIfInState(report)))
                {
                    reportsSharingSvc.setReport(report);
                    $location.path(reportDetailsPath);
                }
            };

            $scope.goToExpenses = function(){
                $location.path('/expenses');
            };
        }
    ]);