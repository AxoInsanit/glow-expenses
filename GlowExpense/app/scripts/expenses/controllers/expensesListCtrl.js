'use strict';

angular.module('Expenses')
    .controller('ExpensesListCtrl', function ($scope, transitionService, expenseResource)  {

        $scope.expenses = [];

        $scope.takePhoto = function(expense) {
            transitionService.go({
                name: 'editExpenseImageModal',
                params: {
                    expenseId: expense.expenseId
                },
                direction: 'forward'
            });
        };

        $scope.editExpense = function(expense) {
            transitionService.go({
                name: 'editExpense',
                params: {
                    expenseId: expense.expenseId
                },
                direction: 'forward'
            });
        };

        $scope.getMoreExpenses = function(){

            //if (!infiniteScrollEnabled){
            //    return;
            //}
            //var result = expenseSharingSvc.getNextFiveExpenses();
            //result.forEach(function(item){
            //    $scope.expenses.push(item);
            //});
        };

        expenseResource.getExpenses().then(function (expenses) {
            $scope.expenses = expenses;
        });
    }
);
