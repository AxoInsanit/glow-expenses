'use strict';

angular.module('Reports')
    .controller('ViewReportCtrl', ['$scope', '$filter', '$location', 'addReportErrorMsg', '$modal', 'reportsSharingSvc',
        'reportExpensesSvc', 'editExpenseSvc', 'expensesRepositorySvc', 'expensesBufferingSvc', 'confirmDeleteDialogSvc',
        'entityName', 'sendReportDialogSvc',
        function ($scope, $filter, $location, addReportErrorMsg, $modal, reportsSharingSvc, reportExpensesSvc,
                  editExpenseSvc, expensesRepositorySvc, expensesBufferingSvc, confirmDeleteDialogSvc, entityName,
                  sendReportDialogSvc)  {

            $scope.report = reportsSharingSvc.getReport();

            $scope.errorMessage = addReportErrorMsg;
            $scope.showErrorMessage = false;
            $scope.expenses = [];
            $scope.editMode = false;

            $scope.openEditMode =function() {
              $scope.editMode = !$scope.editMode;
            };

            $scope.goToEdit = function() {
                $location.path('/edit-report');
            };

//            function onFail(message) {
//                alert('Failed because: ' + message);
//            }
            $scope.editExpense = function(expense) {
                if(!$scope.isEditMode)
                {
                    editExpenseSvc.setExpenseForEdit(expense);
                    $location.path('/edit-expense');
                }
            };

            expensesBufferingSvc.getExpenses($scope).then(function (result) {
                result.forEach(function (item) {
                    $scope.expenses.push(item);
                });
            });

            $scope.createExpense = function() {
                $location.path('/add-expense');
            };

            $scope.deleteExpense = function(expenseId){
                confirmDeleteDialogSvc.open(entityName).then(function(){
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

            $scope.addOrEdit = function(){
                sendReportDialogSvc.open($scope.report.description);
            };
        }
    ]);