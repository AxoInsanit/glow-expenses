'use strict';

angular.module('Directives').directive('expensesList', ['expensesListTemplateUrl', function(expensesListTemplateUrl) {
    return {
        restrict: 'E',
        replace: true,
        controller: function($scope, $location, expenseSvc, expensesRepositorySvc,  confirmDeleteDialogSvc, reportEntity,
                             sessionToken, errorHandlerDefaultSvc, expenseSharingSvc, $routeParams, infiniteScrollEnabled,
                             reportExpensesRepositorySvc) {

            $scope.sort = function(item) {
                return new Date(item.date);
            };

            $scope.deleteExpense = function(expenseId){

                confirmDeleteDialogSvc.open(reportEntity).then(function(){
                    if ($routeParams.reportId) {
                        reportExpensesRepositorySvc.deleteExpense(
                            {
                                expenseId: expenseId,
                                token: localStorage.getItem(sessionToken)
                            },
                            deleteSuccess,
                            errorHandlerDefaultSvc.handleError
                        );
                    } else {
                        expensesRepositorySvc.deleteExpense(
                            {
                                expenseId: expenseId,
                                token: localStorage.getItem(sessionToken)
                            },
                            deleteSuccess,
                            errorHandlerDefaultSvc.handleError
                        );
                    }

                });
            };
        },
        templateUrl: expensesListTemplateUrl
    };
}
]);
