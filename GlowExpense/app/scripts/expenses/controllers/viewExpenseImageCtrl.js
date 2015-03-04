'use strict';

angular.module('Expenses')
    .controller('ViewExpenseImageCtrl', function ($scope, transitionService, expenseResource, $stateParams, ExpenseModel)  {

        var expenseId = $stateParams.expenseId;

        if ($scope.$parent) {
            $scope.$parent.title = 'Invoice image';
        }

        $scope.tabImage = function(){
            $scope.viewImage = !$scope.viewImage;
        };

        expenseResource.getExpense(expenseId).then(function (expense) {
            $scope.expense = new ExpenseModel(expense);
        });
    }
);
