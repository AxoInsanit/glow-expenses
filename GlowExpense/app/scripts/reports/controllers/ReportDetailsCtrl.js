'use strict';

angular.module('Reports')
    .controller('ReportDetailsCtrl', ['$scope', '$location', 'addReportErrorMsg', 'reportsSharingSvc',
        'expensesRepositorySvc', 'confirmDeleteDialogSvc', 'entityName', 'sendReportDialogSvc', 'expensePath',
        'expenseSvc', 'editModeNotificationChannelSvc', 'getIdFromLocationSvc', 'localStorageSvc', 'sessionToken',
        'reportSendRepositorySvc', 'errorHandlerDefaultSvc', 'errorDialogSvc', 'emptyReportErrorMsg',
        'infiniteScrollEnabled', 'cameraSelectDialogListenerSvc', 'expenseSharingSvc',
        function ($scope, $location, addReportErrorMsg, reportsSharingSvc, expensesRepositorySvc, confirmDeleteDialogSvc,
                  entityName, sendReportDialogSvc, expensePath, expenseSvc, editModeNotificationChannelSvc, getIdFromLocationSvc,
                  localStorageSvc, sessionToken, reportSendRepositorySvc, errorHandlerDefaultSvc, errorDialogSvc,
                  emptyReportErrorMsg, infiniteScrollEnabled, cameraSelectDialogListenerSvc, expenseSharingSvc)  {

            $scope.errorMessage = addReportErrorMsg;
            $scope.showErrorMessage = false;
            $scope.expenses = [];
            $scope.isEditMode = false;

            $scope.selectedExpenseIndex = expenseSharingSvc.selectedExpense;

            var reportId = getIdFromLocationSvc.getLastIdFromLocation($location.path());
            $scope.report =reportsSharingSvc.getReportById(reportId);

            expenseSharingSvc.getExpenses($scope.report.expenseReportId).then(function(result) {
                $scope.expenses = result;
            });

            $scope.openEditMode = function() {

                $scope.isEditMode = !$scope.isEditMode;
                editModeNotificationChannelSvc.toggleEditMode($scope.isEditMode);
            };

            $scope.sendReport = function(){
                sendReportDialogSvc.open($scope.report.description);
            };

            $scope.editExpense = function(expense) {
                if(!$scope.isEditMode)
                {
                    $scope.selectedExpenseIndex = expenseSharingSvc.selectedExpense;
                    $location.path('/report-details/' + $scope.report.expenseReportId + '/expense/' + expense.expenseId);
                }
            };

            $scope.createExpense = function(){
                $location.path('/report-details/' + $scope.report.expenseReportId + '/expense');
            };

            $scope.editReport = function(){
                $location.path('/report' + '/' + reportId);
            };

            $scope.sendReport = function(){

                function reportSendSuccess(){
                    reportsSharingSvc.resetReports();
                    $location.path('/reports');
                }

                if ($scope.expenses.length === 0){
                    errorDialogSvc.open(emptyReportErrorMsg).then(function(){
                        return;
                    });
                }
                else {

                    reportSendRepositorySvc.sendReport(
                        {
                            'token': localStorageSvc.getItem(sessionToken),
                            'expenseReportId': $scope.report.expenseReportId
                        },
                        reportSendSuccess,
                        errorHandlerDefaultSvc.handleError
                    );
                }

            };

            $scope.getMoreExpenses = function(){

                if (!infiniteScrollEnabled){
                    return;
                }

                var result = expenseSharingSvc.getNextFiveExpenses(reportId);
                result.forEach(function(item){
                    $scope.expenses.push(item);
                });
            };

            $scope.takePhoto = function(expense) {
                if(!$scope.isEditMode){
                    cameraSelectDialogListenerSvc.openCameraSelectDlg = true;
                    $location.path('/report-details/' + $scope.report.expenseReportId + '/expense/' + expense.expenseId);
                }
            };
        }
    ]);
