'use strict';

angular.module('Expenses')
    .controller('ExpensesListCtrl', function ($scope, transitionService, expenseResource)  {

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

        expenseResource.getExpenses().then(function (expenses) {
            $scope.expenses = expenses;
        });
    }
);
