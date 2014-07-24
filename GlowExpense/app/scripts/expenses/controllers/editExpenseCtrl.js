'use strict';

/* global Camera: false */
/* global alert: false */

angular.module('Expenses')
    .controller('EditExpenseCtrl', ['$scope', 'editExpensesTitle', 'editExpensesButtonLabel',
        function ($scope, editExpensesTitle, editExpensesButtonLabel) {
            $scope.title = editExpensesTitle;
            $scope.buttonLabel = editExpensesButtonLabel;
    }
]);