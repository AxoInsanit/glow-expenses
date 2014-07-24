'use strict';

angular.module('Expenses')
    .controller('EditExpenseCtrl', ['$scope', 'editExpensesTitle', 'editExpensesButtonLabel',
        function ($scope, editExpensesTitle, editExpensesButtonLabel) {
            $scope.title = editExpensesTitle;
            $scope.buttonLabel = editExpensesButtonLabel;
    }
]);