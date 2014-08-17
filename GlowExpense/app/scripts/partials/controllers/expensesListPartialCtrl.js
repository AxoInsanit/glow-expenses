'use strict';

angular.module('Partials')
    .controller('expensesListPartialCtrl', ['$scope', '$location', 'expenseSvc', 'expensesRepositorySvc',
        'expensesBufferingSvc', 'confirmDeleteDialogSvc', 'reportEntity',

        function ($scope, $location, expenseSvc, expensesRepositorySvc, expensesBufferingSvc,
                  confirmDeleteDialogSvc,  reportEntity)  {

            $scope.sort = function(item) {
                return new Date(item.date);
            };

            $scope.deleteExpense = function(expenseId){
                confirmDeleteDialogSvc.open(reportEntity).then(function(){
                    // TODO uncomment when service is working with params
//                            expensesRepositorySvc.deleteExpense(
//                                {
//                                    expenseId: expenseId,
//                                    token: localStorage.getItem('session-token')
//                                }
//                            ).$promise.then(function(){
//                                    $scope.expenses = $scope.expenses.filter(function (expense) {
//                                        return expense.expenseId !== expenseId;
//                                    });
//                            });

                    $scope.expenses = $scope.expenses.filter(function (expense) {
                        return expense.expenseId !== expenseId;
                    });
                });
            };

            $scope.showInvoiceImage = function() {
                $location.path('/invoice-expense-image');
            };
        }
    ]);