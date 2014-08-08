'use strict';

angular.module('Expenses').factory('editExpenseSvc', [function() {

        var expenseForEdit = null;
        var report = null;

        function getExpenseForEdit() {
            return expenseForEdit;
        }

        function setExpenseForEdit(expense) {
            expenseForEdit = expense;
        }

        function setReport(sreport) {
            report = sreport;
        }

        function getReport() {
            return report;
        }

        return {
            getExpenseForEdit: getExpenseForEdit,
            setExpenseForEdit: setExpenseForEdit,
            setReport: setReport,
            getReport: getReport
        };
    }
]);
