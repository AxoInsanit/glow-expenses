'use strict';
/*global alert */

angular.module('Expenses')
    .controller('ExpensesListCtrl', ['$scope', '$filter', '$location', 'expenseSvc', 'expensesRepositorySvc',
        'expensesBufferingSvc', 'editExpenseSvc', 'cameraSvc', '$modal',
        'editModeNotificationChannelSvc',

        function ($scope, $filter, $location, expenseSvc, expensesRepositorySvc, expensesBufferingSvc,
                  editExpenseSvc, cameraSvc, $modal, editModeNotificationChannelSvc)  {

                    // TODO remove this when real services are implemented
                    var firstLoad = true;

                    $scope.expenses = [];

                    $scope.isEditMode = false;
                    $scope.expenseForDeletion = null;

                    function toggleEditModeHandler(isEditMode){
                        $scope.isEditMode = isEditMode;
                    }

                    editModeNotificationChannelSvc.onEditModeToggled($scope, toggleEditModeHandler);

                    $scope.deleteExpense = function(expenseId, expensesRepositorySvc) {
                        $scope.expenseForDeletion = expenseId;
                        var modalInstance = $modal.open({
                            templateUrl: 'deleteModal',
                            controller: 'deleteExpModalCtrl',
                            size: 'sm',
                            resolve: {}
                        });
                        modalInstance.result.then(function () {
                            function onSuccess(expensesRepositorySvc) {
                                expensesRepositorySvc.getExpenses();
                            }

                            function onFail(message) {
                                alert('Failed because: ' + message);
                            }
                            expensesRepositorySvc.deleteExpense(
                                {
                                    'token':localStorage.getItem('session-token'),
                                    'expenseId':$scope.expenseForDeletion.expenseId
                                },
                                onSuccess(expensesRepositorySvc),
                                onFail());
                        }, function () {

                        });
                    };

                    $scope.showInvoiceImage = function() {
                        $location.path('/invoice-expense-image');
                    };

                    $scope.editExpense = function(expense) {
                        if(!$scope.showEditMode)
                        {
                            //debugger;
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