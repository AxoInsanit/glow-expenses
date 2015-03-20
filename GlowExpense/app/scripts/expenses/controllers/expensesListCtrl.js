'use strict';

angular.module('Expenses')
    .controller('ExpensesListCtrl', function ($scope, transitionService,  expenseResource, reportResource, $stateParams)  {

        $scope.reportId = $stateParams.reportId;
        $scope.expensesViewActive = $stateParams.view === 'expenses';

        if($scope.reportId) {
            expenseResource.getExpenses().then(function (expenses) {
                $scope.expenses = expenses;
            });
        }

        if ($scope.$parent && $scope.reportId) {
            $scope.editMode = true;
            reportResource.getReport($scope.reportId).then( function(report){
                $scope.$parent.title = 'Add to ' + report.description;
            });
        }

        $scope.$on('width-fixed-element',function(e, value){
            transitionService.setWidthToHalf((value === 50));
        });

        $scope.widthToHalf = function(){
            return transitionService.getWidthToHalf();
        };

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
                direction: 'forward'
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
