'use strict';

angular.module('Reports')
    .controller('ReportDetailsCtrl', ['$scope', '$location', 'addReportErrorMsg', 'reportsSharingSvc',
        'reportExpensesSvc', 'editExpenseSvc', 'expensesRepositorySvc', 'expensesBufferingSvc', 'confirmDeleteDialogSvc',
        'entityName', 'sendReportDialogSvc', 'editExpensePath',
        function ($scope, $location, addReportErrorMsg, reportsSharingSvc, reportExpensesSvc,
                  editExpenseSvc, expensesRepositorySvc, expensesBufferingSvc, confirmDeleteDialogSvc, entityName,
                  sendReportDialogSvc, editExpensePath)  {

            $scope.errorMessage = addReportErrorMsg;
            $scope.showErrorMessage = false;
            $scope.expenses = [];
            $scope.editMode = false;

            $scope.report = reportsSharingSvc.getReport();

            expensesBufferingSvc.getExpenses($scope.report.expenseReportId).then(function (result) {
                result.forEach(function (item) {
                    $scope.expenses.push(item);
                });
            });

            $scope.openEditMode =function() {
              $scope.editMode = !$scope.editMode;
            };

            $scope.goToEdit = function() {
                $location.path('/edit-report');
            };

            $scope.editExpense = function(expense) {
                if(!$scope.editMode)
                {
                    editExpenseSvc.setExpenseForEdit(expense);
                    $location.path(editExpensePath);
                }
            };

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

            $scope.sendReport = function(){
                sendReportDialogSvc.open($scope.report.description);
            };
        }
    ]);