'use strict';

angular.module('Reports')
    .controller('ReportsListCtrl', ['$scope', '$location', 'reportsSharingSvc',
        'editModeNotificationChannelSvc', 'reportsRepositorySvc', 'filterReportByStateSvc', 'entityName',
        'confirmDeleteDialogSvc', 'reportDetailsPath', 'sessionToken', 'errorHandlerDefaultSvc', 'localStorageSvc',
            function ($scope, $location, reportsSharingSvc, editModeNotificationChannelSvc,
                      reportsRepositorySvc, filterReportByStateSvc, entityName, confirmDeleteDialogSvc,
                      reportDetailsPath, sessionToken, errorHandlerDefaultSvc, localStorageSvc)  {

            $scope.sort = function(item) {
                return new Date(item.creationDate);
            };

            $scope.selectedExpenseIndex = reportsSharingSvc.selectedReport;

            $scope.reports = [];

            reportsSharingSvc.getReports().then(function(result){
                debugger;
                $scope.reports = result;
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
                    debugger;
                    reportsSharingSvc.deleteReport(reportId);
                    debugger;
                    var reportToDeleteIndex = 0;

                    $scope.reports.some(function(item, index){
                        if (item.expenseReportId === reportId){
                            reportToDeleteIndex = index;
                            debugger;
                            return true;
                        }
                    });

                    if (reportToDeleteIndex !== null){
                        $scope.reports.splice(reportToDeleteIndex, 1);
                    }
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

            $scope.viewReport = function(report, index) {
                reportsSharingSvc.selectedReport = index;
                if((!$scope.isEditMode) && (!report.locked) && (filterReportByStateSvc.checkIfInState(report)))
                {
                    $location.path(reportDetailsPath + '/' + report.expenseReportId);
                }
            };

            $scope.goToExpenses = function(){
                $location.path('/expenses');
            };

            $scope.getMoreReports = function(){
                debugger;
                var result = reportsSharingSvc.getNextFiveReports();
                $scope.reports = result;
            };
        }
    ]);