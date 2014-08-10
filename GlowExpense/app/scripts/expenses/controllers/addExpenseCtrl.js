'use strict';

angular.module('Expenses')
    .controller('AddExpenseCtrl', ['$scope', 'addExpensesTitle', 'addExpensesButtonLabel', 'reportSharingSvc',
        function ($scope, addExpensesTitle, addExpensesButtonLabel, reportSharingSvc) {
            $scope.title = addExpensesTitle;
            $scope.buttonLabel = addExpensesButtonLabel;

            $scope.date = new Date();

            $scope.report = reportSharingSvc.getReport();

            $scope.expense = {};
    }
]);