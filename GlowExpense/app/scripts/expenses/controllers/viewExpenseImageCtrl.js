'use strict';

angular.module('Expenses')
    .controller('ViewExpenseImageCtrl', function ($scope, transitionService, expenseResource, reportResource, $stateParams, ExpenseModel)  {

        var expenseId = $stateParams.expenseId,
            reportId = $stateParams.reportId,
            localImagePath = $stateParams.localImagePath;

        if ($scope.$parent) {
            $scope.$parent.title = 'Invoice image';
        }

        if(reportId) {
	        reportResource.getExpense(expenseId, reportId).then(function (expense) {
	            $scope.expense = new ExpenseModel(expense);
                $scope.expense.imagePath = localImagePath ? localImagePath : $scope.expense.imagePath;
	        });
        } else {
            $scope.$parent.backStateName = 'editExpense';
            $scope.$parent.backStateParams = {expenseId: expenseId};
            expenseResource.getExpense(expenseId).then(function (expense) {
                $scope.expense = new ExpenseModel(expense);
                $scope.expense.imagePath = localImagePath ? localImagePath : $scope.expense.imagePath;
            });
        }
    }
);
