'use strict';

angular.module('Reports')
    .controller('ReportDetailsCtrl', ['$scope', '$location', 'addReportErrorMsg', 'reportsSharingSvc',
         'expensesRepositorySvc', 'confirmDeleteDialogSvc', 'entityName', 'sendReportDialogSvc', 'expensePath',
        'expenseSvc', 'editModeNotificationChannelSvc', 'getIdFromLocationSvc',
        function ($scope, $location, addReportErrorMsg, reportsSharingSvc, expensesRepositorySvc, confirmDeleteDialogSvc,
            entityName, sendReportDialogSvc, expensePath, expenseSvc, editModeNotificationChannelSvc, getIdFromLocationSvc)  {

            $scope.errorMessage = addReportErrorMsg;
            $scope.showErrorMessage = false;
            $scope.expenses = [];
            $scope.isEditMode = false;

            var reportId = getIdFromLocationSvc.getLastIdFromLocation($location.path());
            $scope.report = reportsSharingSvc.getReportById(reportId);

            reportsSharingSvc.expenseSharingSvc.getExpenses($scope.report.expenseReportId).then(function(result) {
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
                    $location.path('/report-details/' + $scope.report.expenseReportId + '/expense/' + expense.expenseId);
                }
            };

            $scope.createExpense = function(){
                $location.path('/report-details/' + $scope.report.expenseReportId + '/expense');
            };

            $scope.editReport = function(){
                $location.path('/report' + '/' + reportId);
            }


        }
    ]);