'use strict';

angular.module('Reports')
    .controller('ReportsListCtrl', ['$scope', '$location', 'reportsSharingSvc',
        'editModeNotificationChannelSvc', 'reportsRepositorySvc', 'filterReportByStateSvc', 'entityName',
        'confirmDeleteDialogSvc', 'reportDetailsPath', 'sessionToken', 'errorHandlerDefaultSvc', 'localStorageSvc',
            function ($scope, $location, reportsSharingSvc, editModeNotificationChannelSvc,
                      reportsRepositorySvc, filterReportByStateSvc, entityName, confirmDeleteDialogSvc,
                      reportDetailsPath, sessionToken, errorHandlerDefaultSvc, localStorageSvc)  {

            reportsSharingSvc.getReports().then(function(reports){
                $scope.reports = reports;
            });

            $scope.isEditMode = false;

            function toggleEditModeHandler(isEditMode){
                $scope.isEditMode = isEditMode;
            }

            editModeNotificationChannelSvc.onEditModeToggled($scope, toggleEditModeHandler);

            $scope.createReport = function(){
                $location.path('/report');
            };

            $scope.deleteReport = function(reportId) {
                function deleteReportSuccess(){
                    reportsSharingSvc.deleteReport(reportId);
                }

                confirmDeleteDialogSvc.open(entityName).then(function(){
                    reportsRepositorySvc.deleteReport(
                        {
                            'token': localStorageSvc.getItem(sessionToken),
                            'expenseReportId': reportId
                        },
                        deleteReportSuccess,
                        errorHandlerDefaultSvc.handleError
                    );
                });
            };

            $scope.viewReport = function(report) {
                if((!$scope.isEditMode) && (!report.locked) && (filterReportByStateSvc.checkIfInState(report)))
                {
                    $location.path(reportDetailsPath + '/' + report.expenseReportId);
                }
            };

            $scope.goToExpenses = function(){
                $location.path('/expenses');
            };
        }
    ]);