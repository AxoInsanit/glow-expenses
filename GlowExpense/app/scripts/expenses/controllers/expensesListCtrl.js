'use strict';

angular.module('Expenses')
    .controller('ExpensesListCtrl', function ($scope, transitionService,  expenseResource, reportResource, $stateParams)  {

        $scope.reportId = $stateParams.reportId;

        if($scope.reportId) {
            expenseResource.getExpenses().then(function (expenses) {
                $scope.expenses = expenses;
            });
        }

        if ($scope.$parent && $scope.reportId) {
            reportResource.getReport($scope.reportId).then( function(report){
                $scope.$parent.title = 'Add to ' + report.description;
            });
        }

        $scope.takePhoto = function(expense) {
            transitionService.go({
                name: 'editExpenseImageModal',
                params: {
                    expenseId: expense.expenseId
                },
                direction: 'forward'
            });
        };

        $scope.createExpense = function() {
            transitionService.go({
                name: 'addReportExpense',
                direction: 'fade-center'
            });
        };

        $scope.editExpense = function(expense) {
            transitionService.go({
                name: 'editExpense',
                params: {
                    expenseId: expense.expenseId
                },
                direction: 'forward'
            });
        };

    }
);
