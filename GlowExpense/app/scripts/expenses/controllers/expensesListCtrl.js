'use strict';

angular.module('Expenses')
    .controller('ExpensesListCtrl', ['$scope', '$location', 'cameraSvc', 'expenseSvc', 'expenseSharingSvc',
        'editModeNotificationChannelSvc', 'reportsSharingSvc', 'expensePath', 'reportsPath', 'cameraSelectDialogListenerSvc',
        function ($scope, $location, cameraSvc, expenseSvc, expenseSharingSvc, editModeNotificationChannelSvc,
            reportsSharingSvc, expensePath, reportsPath, cameraSelectDialogListenerSvc)  {

            $scope.expenses = [];

            $scope.selectedExpenseIndex = expenseSharingSvc.selectedExpense;

            $scope.isEditMode = false;

            function toggleEditModeHandler(isEditMode){
                $scope.isEditMode = isEditMode;
            }

            editModeNotificationChannelSvc.onEditModeToggled($scope, toggleEditModeHandler);

            $scope.goToReports =  function(){
                $location.path(reportsPath);
            };

            expenseSharingSvc.getExpenses().then(function(result) {
                $scope.expenses = result;
            });

            $scope.takePhoto = function(expense) {
                if(!$scope.isEditMode){
                    cameraSelectDialogListenerSvc.openCameraSelectDlg = true;
                    $location.path(expensePath + '/' + expense.expenseId);
                }
            };

            $scope.editExpense = function(expense, index) {
                if(!$scope.isEditMode)
                {
                    expenseSharingSvc.selectedExpense = index;
                    $location.path(expensePath + '/' + expense.expenseId);
                }
            };

            $scope.getMoreExpenses = function(){
                var result = expenseSharingSvc.getNextFiveExpenses();
                result.forEach(function(item){
                    $scope.expenses.push(item);
                });
            };
        }
    ]);