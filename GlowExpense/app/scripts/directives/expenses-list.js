'use strict';

angular.module('Directives').directive('expensesList', [function() {
        return {
            restrict: 'E',
            replace: true,
            controller: ['$scope', '$location', 'expenseSvc', 'expensesRepositorySvc', 'expensesBufferingSvc',
                'confirmDeleteDialogSvc', 'reportEntity', 'sessionToken',
                function($scope, $location, expenseSvc, expensesRepositorySvc, expensesBufferingSvc,
                    confirmDeleteDialogSvc, reportEntity, sessionToken) {

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
                            // TODO uncomment when service is working with params
                            expensesRepositorySvc.deleteExpense(
                                {
                                    expenseId: expenseId,
                                    token: localStorage.getItem(sessionToken)
                                },
                                deleteSuccess
                            );

//                            $scope.expenses = $scope.expenses.filter(function (expense) {
//                                return expense.expenseId !== expenseId;
//                            });
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