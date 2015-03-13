'use strict';

angular.module('Expenses')
    .controller('ViewExpenseImageCtrl', function ($scope, transitionService, expenseResource, reportResource, $stateParams, ExpenseModel)  {

        var expenseId = $stateParams.expenseId,
            reportId = $stateParams.reportId;

        if ($scope.$parent) {
            $scope.$parent.title = 'Invoice image';
        }

        if(reportId) {
	        reportResource.getExpense(expenseId, reportId).then(function (expense) {
	            $scope.expense = new ExpenseModel(expense);
	        });
        } else {
            $scope.$parent.backStateName = 'editExpense';
            $scope.$parent.backStateParams = {expenseId: expenseId};
            expenseResource.getExpense(expenseId).then(function (expense) {
                $scope.expense = new ExpenseModel(expense);
            });
        }
    }
);
