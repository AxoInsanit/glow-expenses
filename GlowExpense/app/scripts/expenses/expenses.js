'use strict';

angular.module('Expenses', [])
    .config(function () {})
    .constant('addExpenseErrorMsg','Please complete all fields!')
    .constant('addExpensesTitle','Create Expenses')
    .constant('addExpensesButtonLabel','Create')
    .constant('editExpensesTitle','Edit Expense')
    .constant('editExpensesButtonLabel','Save')
    .constant('reportEntity','Expense')
    .constant('reportable', 'REPORTABLE')
    .constant('reportEntityName', 'report');


