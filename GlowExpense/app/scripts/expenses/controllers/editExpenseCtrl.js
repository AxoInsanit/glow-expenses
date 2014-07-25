'use strict';

angular.module('Expenses')
    .controller('EditExpenseCtrl', ['$scope', 'editExpensesTitle', 'editExpensesButtonLabel', 'editExpenseSvc', 'cameraSvc',
        function ($scope, editExpensesTitle, editExpensesButtonLabel, editExpenseSvc, cameraSvc) {
            $scope.title = editExpensesTitle;
            $scope.buttonLabel = editExpensesButtonLabel;

            $scope.expense = editExpenseSvc.getExpenseForEdit();
            $scope.date = $scope.expense.date;

            $scope.imageSelectedPath = null;

            if ($scope.expense.imageType !== 'void'){
                $scope.imageSelectedPath = './scripts/expenses/views/img.jpg';
            }


            $scope.takePhoto = function() {
                cameraSvc.takePhoto().then(function(result){
                    $scope.imageSelectedPath = result;
                });
            };
        }
]);