'use strict';

angular.module('Expenses').factory('expenseSharingSvc', ['reportsRepositorySvc',function(reportsRepositorySvc) {

        var expenseForEdit = null;

        var allExpenses = [];
        var expenseIdsReadyToBeAssigned = [];

        function getExpenseForEdit() {
            return expenseForEdit;
        }

        function setExpenseForEdit(expense) {
            expenseForEdit = expense;
        }

        function setExpenses(expenses){
            allExpenses = expenses;
        }

        function getExpenseIdsForReportAssign(){
            allExpenses.forEach(function(expense){
                if (expense.imageType !== 'void'){
                    expenseIdsReadyToBeAssigned.push(expense.expenseId);
                }
            });

            debugger;
            return expenseIdsReadyToBeAssigned;
        }

        return {
            getExpenseForEdit: getExpenseForEdit,
            setExpenseForEdit: setExpenseForEdit,
            getExpenseIdsForReportAssign: getExpenseIdsForReportAssign,
            setExpenses: setExpenses
        };
    }
]);
