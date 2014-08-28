'use strict';

angular.module('Expenses')
    .controller('ExpensesListCtrl', ['$scope', '$location', 'cameraSvc', 'expensesBufferingSvc', 'expenseSvc',
        'expenseSharingSvc', 'editModeNotificationChannelSvc', 'reportsSharingSvc', 'expensePath', 'reportsPath',
        function ($scope, $location, cameraSvc, expensesBufferingSvc, expenseSvc, expenseSharingSvc,
                  editModeNotificationChannelSvc, reportsSharingSvc, expensePath, reportsPath)  {

        $scope.expenses = [];
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
                cameraSvc.takePhoto().then(function(){
                    // TODO get the type from the image or make constants with the types
                    expense.imageType = 'jpg';
                });
            }
        };

        $scope.editExpense = function(expense) {
            if(!$scope.isEditMode)
            {
                $location.path(expensePath + '/' + expense.expenseId);
            }
        };
    }
]);