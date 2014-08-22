'use strict';

angular.module('Services', [])
    .config(function () {})
    .constant('editModeToggled', 'TOGGLE_EDIT_MODE')
    .constant('reportAssigned', 'REPORT_ASSIGNED')
    .constant('expenseEdited', 'EXPENSE_EDITED')

    .constant('unauthorized', 'Wrong username or password!')
    .constant('badRequest', 'Invalid parameters!')
    .constant('notFound', 'The requested resource is not available!')
    .constant('generalError', 'An error has occured!');



