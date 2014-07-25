'use strict';

angular.module('Expenses').factory('editExpenseSvc', [function() {

        var expenseForEdit = null;

        function getExpenseForEdit() {
            return expenseForEdit;
        }

        function setExpenseForEdit(expense) {
            expenseForEdit = expense;
        }

        return {
            getExpenseForEdit: getExpenseForEdit,
            setExpenseForEdit: setExpenseForEdit
        };
    }
]);
