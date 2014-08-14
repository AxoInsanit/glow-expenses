'use strict';

angular.module('Partials')
    .controller('expensesListPartialCtrl', ['$scope', '$location', 'expenseSvc', 'expensesRepositorySvc',
        'expensesBufferingSvc', 'editExpenseSvc',
        'editModeNotificationChannelSvc', 'confirmDeleteDialogSvc', 'reportEntity',

        function ($scope, $location, expenseSvc, expensesRepositorySvc, expensesBufferingSvc,
                  editExpenseSvc, editModeNotificationChannelSvc, confirmDeleteDialogSvc,  reportEntity)  {

            $scope.sort = function(item) {
                return new Date(item.date);
            };

            $scope.isEditMode = false;

            function toggleEditModeHandler(isEditMode){
                $scope.isEditMode = isEditMode;
            }

            editModeNotificationChannelSvc.onEditModeToggled($scope, toggleEditModeHandler);

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

            $scope.editExpense = function(expense) {
                if(!$scope.isEditMode)
                {
                    editExpenseSvc.setExpenseForEdit(expense);
                    $location.path('/edit-expense');
                }
            };
        }
    ]);