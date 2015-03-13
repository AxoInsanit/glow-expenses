'use strict';

angular.module('Directives').directive('expensesList', function($stateParams, transitionService) {
    return {
        restrict: 'E',
        replace: true,
        controller: function($scope) {

            $scope.takePhoto = function (expense, event) {
                event.stopPropagation();
                event.preventDefault();
                if ($stateParams.reportId) {
                    transitionService.go({
                        name: 'editReportExpense',
                        params: {
                            reportId: $stateParams.reportId,
                            expenseId: expense.expenseId,
                            imageModal: 'open'
                        },
                        direction: 'forward'
                    });
                } else {
                    transitionService.go({
                        name: 'editExpense',
                        params: {
                            expenseId: expense.expenseId,
                            imageModal: 'open'
                        },
                        direction: 'forward'
                    });
                }
            };
        },
        templateUrl: 'scripts/directives/views/expenses-list.html'
    };
});
