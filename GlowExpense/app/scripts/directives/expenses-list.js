'use strict';

angular.module('Directives').directive('expensesList', [function() {
        return {
            restrict: 'E',
            replace: true,
            controller: ['$scope', '$location', 'expenseSvc', 'expensesRepositorySvc', 'expensesBufferingSvc',
                'confirmDeleteDialogSvc', 'reportEntity', 'sessionToken', 'errorHandlerDefaultSvc',
                function($scope, $location, expenseSvc, expensesRepositorySvc, expensesBufferingSvc,
                    confirmDeleteDialogSvc, reportEntity, sessionToken, errorHandlerDefaultSvc) {

                    $scope.sort = function(item) {
                        return new Date(item.date);
                    };

                    $scope.deleteExpense = function(expenseId){

                        function deleteSuccess(){
                            $scope.expenses = $scope.expenses.filter(function (expense) {
                                return expense.expenseId !== expenseId;
                            });
                        }

                        confirmDeleteDialogSvc.open(reportEntity).then(function(){
                            expensesRepositorySvc.deleteExpense(
                                {
                                    expenseId: expenseId,
                                    token: localStorage.getItem(sessionToken)
                                },
                                deleteSuccess,
                                errorHandlerDefaultSvc.handleError
                            );
                        });
                    };

                    $scope.showInvoiceImage = function() {
                        $location.path('/invoice-expense-image');
                    };
                }
            ],
            templateUrl: 'scripts/directives/views/expenses-list.html'
        };
    }
]);