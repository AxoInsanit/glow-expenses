'use strict';

angular.module('Reports')
    .controller('ViewReportCtrl', ['$scope', '$filter', '$location', 'addReportErrorMsg', '$modal', 'reportSharingSvc', 'reportExpensesSvc', 'editExpenseSvc', 'expensesRepositorySvc',
        function ($scope, $filter, $location, addReportErrorMsg, $modal, reportSharingSvc, reportExpensesSvc, editExpenseSvc, expensesRepositorySvc)  {
        	//debugger;
        	$scope.report = reportSharingSvc.getReport().data;
            $scope.errorMessage = addReportErrorMsg;
            $scope.showErrorMessage = false;
            $scope.expenses = [];
            $scope.editMode = false;

            $scope.openEditMode =function() {
              $scope.editMode = !$scope.editMode;
            };

            $scope.editExpense = function(expense) {
                if(!$scope.editMode)
                {
                    editExpenseSvc.setExpenseForEdit(expense);
                    editExpenseSvc.setReport($scope.report);
                    $location.path('/edit-expense');
                }
            };

            $scope.goToEdit = function() {
                $location.path('/edit-report');
            };

            function onSuccess(expenses) {
            	$scope.expenses = expenses;
            };

            function onFail(message) {
                alert('Failed because: ' + message);
            };

            reportExpensesSvc.getExpenses( onSuccess,onFail );
            $scope.createExpense = function() {
             	$location.path('/add-expense');
            };

            $scope.deleteExpense = function(expense) {
                $scope.expenseForDeletion = expense.expenseId;
                var modalInstance = $modal.open({
                    templateUrl: 'deleteModal',
                    controller: 'deleteExpModalCtrl',
                    size: "sm",
                    resolve: {}
                });   
                modalInstance.result.then(function () {
                    function onSuccess() {
                        reportExpensesSvc.getExpenses( onSuccess,onFail );
                    }

                    function onFail(message) {
                        alert('Failed because: ' + message);
                    }
                    //debugger;
                    expensesRepositorySvc.deleteExpense({"token":localStorage.getItem("session-token"),"expenseId":$scope.expenseForDeletion},onSuccess(),onFail());
                }, function () {
                });             
            };

            $scope.addOrEdit = function() {
             	var modalInstance = $modal.open({
                  templateUrl: 'createModal',
                  controller: successModalCtrl,
                  resolve: {
                    data: function () {
                      return {
                        "expenses":$scope.report
                      };
                    }
                  }
                });
            };
        }
    ]);