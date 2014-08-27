'use strict';

angular.module('Reports')
    .controller('ReportDetailsCtrl', ['$scope', '$location', 'addReportErrorMsg', 'reportsSharingSvc',
         'expensesRepositorySvc', 'confirmDeleteDialogSvc',
        'entityName', 'sendReportDialogSvc', 'editExpensePath', 'expenseSvc', 'editModeNotificationChannelSvc', 'reportSendRepositorySvc',
        function ($scope, $location, addReportErrorMsg, reportsSharingSvc,
                  expensesRepositorySvc, confirmDeleteDialogSvc, entityName,
                  sendReportDialogSvc, editExpensePath, expenseSvc, editModeNotificationChannelSvc, reportSendRepositorySvc)  {

            $scope.errorMessage = addReportErrorMsg;
            $scope.showErrorMessage = false;
            $scope.expenses = [];
            $scope.isEditMode = false;

            $scope.report = reportsSharingSvc.getReport();
            $scope.report.expenseIds = [];

            //full expenses collection. Used to mark and controll the expenses placed on screen
            $scope.expensesCollection ={}
            $scope.expensesCollection.shown = 0;
            //this variable controll how many expenses are on screen
            $scope.counter = 5;

            function setMoreExpenses(){
                //we save the code from error if we go over the array length
                if($scope.expensesCollection.items.length < $scope.expensesCollection.shown +$scope.counter)
                {
                    $scope.expensesCollection.shown = $scope.expensesCollection.items.length - $scope.counter;
                }

                for(var counter = $scope.expensesCollection.shown; counter < $scope.expensesCollection.shown +$scope.counter; counter++)
                {
                    $scope.expenses[counter] = $scope.expensesCollection.items[counter];
                }

                $scope.expensesCollection.shown += $scope.counter;
            }

            function onSuccessReportSend(){
                sendReportDialogSvc.open($scope.report.description);
            }
            
            $scope.getMoreExpenses = function () {
                setMoreExpenses();

                // expensesBufferingSvc.getMoreExpenses().then(function (result) {
                //     result.forEach(function (item) {
                //         $scope.expenses.push(expenseSvc.getExpense(item));
                //     });
                // });
            };

            reportsSharingSvc.expenseSharingSvc.getExpenses($scope.report.expenseReportId).then(function(result) {
                $scope.expensesCollection.items = result.sort(function(a,b){
                  // Turn your strings into dates, and then subtract them
                  // to get a value that is either negative, positive, or zero.
                  return new Date(b.date) - new Date(a.date);
                });

                setMoreExpenses();
            });

//            expensesBufferingSvc.getExpenses($scope.report.expenseReportId).then(function (result) {
//                result.forEach(function (item) {
//                    $scope.expenses.push(item);
//                    $scope.report.expenseIds.push(item.expenseId);
//                });
//            });

            $scope.openEditMode = function() {

              $scope.isEditMode = !$scope.isEditMode;
              editModeNotificationChannelSvc.toggleEditMode($scope.isEditMode);
            };

            $scope.sendReport = function(){
                reportSendRepositorySvc.sendReport(
                    {
                        'token': localStorage.getItem('session-token'),
                        'expenseReportId': $scope.report.expenseReportId
                    },onSuccessReportSend);

               
            };

            $scope.editExpense = function(expense) {
                if(!$scope.isEditMode)
                {
                   // expenseSharingSvc.setExpenseForEdit(expense);
                    reportsSharingSvc.setReport($scope.report);
                    $location.path(editExpensePath);
                }
            };
        }
    ]);