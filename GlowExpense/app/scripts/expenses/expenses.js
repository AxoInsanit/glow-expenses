'use strict';

angular.module('Expenses', [])
    .config(function () {})
    .constant('defaultMode','_DEFAULT_')
    .constant('selectMode','_SELECT_')
    .constant('selectModeActivated','_SELECT_MODE_ACTIVATED')
    .constant('detailsModeActivated','_DETAILS_MODE_ACTIVATED')
    .constant('addExpenseErrorMsg','Please complete all fields!')
    .constant('addExpensesTitle','Add Expenses')
    .constant('addExpensesButtonLabel','Add')
    .constant('editExpensesTitle','Edit Expenses')
    .constant('editExpensesButtonLabel','Edit');


