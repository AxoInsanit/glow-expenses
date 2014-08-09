'use strict';
/*global alert */

angular.module('Expenses')
    .controller('ExpensesListCtrl', ['$scope', '$filter', '$location', 'expenseSvc', 'expensesRepositorySvc',
        'expensesBufferingSvc', 'editExpenseSvc', 'cameraSvc',
        'editModeNotificationChannelSvc', 'confirmDeleteDialogSvc', 'entityName',

        function ($scope, $filter, $location, expenseSvc, expensesRepositorySvc, expensesBufferingSvc,
                  editExpenseSvc, cameraSvc, editModeNotificationChannelSvc, confirmDeleteDialogSvc,  entityName)  {


                    // TODO remove this when real services are implemented
                    var firstLoad = true;

                    $scope.expenses = [];

                    $scope.isEditMode = false;
                    $scope.expenseForDeletion = null;

                    function toggleEditModeHandler(isEditMode){
                        $scope.isEditMode = isEditMode;
                    }

                    editModeNotificationChannelSvc.onEditModeToggled($scope, toggleEditModeHandler);

                    $scope.deleteExpense = function(expenseId){
                        confirmDeleteDialogSvc.open(entityName).then(function(){
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

                    $scope.getMoreExpenses = function () {

                        // TODO remove this when real services are implemented
                        if (firstLoad) {
                            firstLoad = false;
                            return;
                        }

                        expensesBufferingSvc.getMoreExpenses($scope).then(function (result) {
                            result.forEach(function (item) {
                                $scope.expenses.push(expenseSvc.getExpense($scope, item));
                            });

                        });
                    };

                    $scope.takePhoto = function(expense) {
                        cameraSvc.takePhoto().then(function(){
                            // TODO get the type from the image or make constants with the types
                            expense.imageType = 'jpg';
                        });
                    };

                    expensesBufferingSvc.getExpenses($scope).then(function (result) {
                        result.forEach(function (item) {
                            $scope.expenses.push(item);
                        });
                    });

                }
    ]);