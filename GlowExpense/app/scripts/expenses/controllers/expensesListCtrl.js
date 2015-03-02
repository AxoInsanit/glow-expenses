'use strict';

angular.module('Expenses')
    .controller('ExpensesListCtrl', function ($scope, $location, expenseSharingSvc, cameraSelectDialogListenerSvc,
                                              reportsPath, editModeNotificationChannelSvc, expensePath,
                                              infiniteScrollEnabled)  {

        $scope.expenses = [];

        $scope.selectedExpenseIndex = expenseSharingSvc.selectedExpense;

        $scope.isEditMode = false;

        function toggleEditModeHandler(isEditMode){
            $scope.isEditMode = isEditMode;
        }

        editModeNotificationChannelSvc.onEditModeToggled($scope, toggleEditModeHandler);

        $scope.goToReports =  function(){
            $location.path('/reports');
        };

        $scope.takePhoto = function(expense) {
            if(!$scope.isEditMode){
                cameraSelectDialogListenerSvc.openCameraSelectDlg = true;
                $location.path('/expenses/' + expense.expenseId);
            }
        };

        $scope.editExpense = function(expense) {
            if(!$scope.isEditMode) {
                $location.path('/expenses/' + expense.expenseId);
            }
        };

        $scope.getMoreExpenses = function(){

            if (!infiniteScrollEnabled){
                return;
            }
            var result = expenseSharingSvc.getNextFiveExpenses();
            result.forEach(function(item){
                $scope.expenses.push(item);
            });
        };

        expenseSharingSvc.getExpenses().then(function (expenses) {
            $scope.expenses = expenses;
        });
    }
);
