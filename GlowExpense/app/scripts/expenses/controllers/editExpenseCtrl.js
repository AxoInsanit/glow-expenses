'use strict';

angular.module('Expenses')
    .controller('EditExpenseCtrl', ['$scope', 'editExpensesTitle', 'editExpensesButtonLabel', 'editExpenseSvc',
        function ($scope, editExpensesTitle, editExpensesButtonLabel, editExpenseSvc) {
            $scope.title = editExpensesTitle;
            $scope.buttonLabel = editExpensesButtonLabel;

            $scope.expense = editExpenseSvc.getExpenseForEdit();
            $scope.date = $scope.expense.date;
        }
]);