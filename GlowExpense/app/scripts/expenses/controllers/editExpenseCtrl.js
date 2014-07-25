'use strict';

angular.module('Expenses')
    .controller('EditExpenseCtrl', ['$scope', 'editExpensesTitle', 'editExpensesButtonLabel', 'editExpenseSvc', 'cameraSvc',
        function ($scope, editExpensesTitle, editExpensesButtonLabel, editExpenseSvc, cameraSvc) {
            $scope.title = editExpensesTitle;
            $scope.buttonLabel = editExpensesButtonLabel;

            $scope.expense = editExpenseSvc.getExpenseForEdit();
            $scope.date = $scope.expense.date;

            $scope.takePhoto = function() {
                cameraSvc.takePhoto().then(function(result){
                    $scope.imageSelectedPath = result;
                });
            };
        }
]);