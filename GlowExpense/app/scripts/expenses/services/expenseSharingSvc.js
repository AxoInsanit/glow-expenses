'use strict';

angular.module('Expenses').factory('expenseSharingSvc', [function() {

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
