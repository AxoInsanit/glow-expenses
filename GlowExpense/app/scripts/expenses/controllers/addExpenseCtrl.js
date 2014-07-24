'use strict';

/* global Camera: false */
/* global alert: false */

angular.module('Expenses')
    .controller('AddExpenseCtrl', ['$scope', 'addExpensesTitle', 'addExpensesButtonLabel',
        function ($scope, addExpensesTitle, addExpensesButtonLabel) {
            $scope.title = addExpensesTitle;
            $scope.buttonLabel = addExpensesButtonLabel;
    }
]);