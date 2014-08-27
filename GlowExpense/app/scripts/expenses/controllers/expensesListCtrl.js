'use strict';

angular.module('Expenses')
    .controller('ExpensesListCtrl', ['$scope', '$location', 'cameraSvc', 'expensesBufferingSvc', 'expenseSvc',
        'expenseSharingSvc', 'editModeNotificationChannelSvc', 'reportsSharingSvc', 'expensePath', 'reportsPath',
        function ($scope, $location, cameraSvc, expensesBufferingSvc, expenseSvc, expenseSharingSvc,
                  editModeNotificationChannelSvc, reportsSharingSvc, expensePath, reportsPath)  {

        $scope.expenses = [];

        //full expenses collection. Used to mark and controll the expenses placed on screen
        $scope.expensesCollection ={}
        $scope.expensesCollection.shown = 0;
        //this variable controll how many expenses are on screen
        $scope.counter = 5;

        $scope.isEditMode = false;

        function toggleEditModeHandler(isEditMode){
            $scope.isEditMode = isEditMode;
        }

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

        editModeNotificationChannelSvc.onEditModeToggled($scope, toggleEditModeHandler);

        $scope.getMoreExpenses = function () {
            //debugger;
            setMoreExpenses();

            // expensesBufferingSvc.getMoreExpenses().then(function (result) {
            //     result.forEach(function (item) {
            //         $scope.expenses.push(expenseSvc.getExpense(item));
            //     });
            // });
        };

        $scope.goToReports =  function(){
            $location.path(reportsPath);
        };

        expenseSharingSvc.getExpenses().then(function(result) {
            $scope.expensesCollection.items = result.sort(function(a,b){
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              return new Date(b.date) - new Date(a.date);
            });

            setMoreExpenses();
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
                expenseSharingSvc.setExpenseForEdit(expense);
                reportsSharingSvc.setReport();
                $location.path(expensePath + '/' + expense.expenseId);
            }
        };
    }
]);