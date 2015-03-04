'use strict';

angular.module('Services', [])
    .config(function () {})
    .constant('editModeToggled', 'TOGGLE_EDIT_MODE')
    .constant('reportAssigned', 'REPORT_ASSIGNED')
    .constant('expenseEdited', 'EXPENSE_EDITED')
    .constant('currencyStorageKey', 'currencies')
    .constant('contableCodeStorageKey', 'contableCode')
    .constant('unauthorized', 'The user is not authorized!')
    .constant('badRequest', 'Invalid parameters!')
    .constant('notFound', 'The requested resource is not available!')
    .constant('generalError', 'An error has occured!');



