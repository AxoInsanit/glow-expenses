'use strict';

angular.module('Expenses', [])
    .config(function () {})
    .constant('defaultMode','_DEFAULT_')
    .constant('selectMode','_SELECT_')
    .constant('selectModeActivated','_SELECT_MODE_ACTIVATED')
    .constant('detailsModeActivated','_DETAILS_MODE_ACTIVATED')
    .constant('addExpenseErrorMsg','Please complete all fields!')

    .constant('expensesUrl', 'https://esb.dev.corp.globant.com/expense/:image')
    .constant('expensesUrlMockWeb', 'http://127.0.0.1:8080/service/expense/:image')
    .constant('expensesUrlMockEmulate', 'http://10.0.3.2:8080/service/expense/:image')
    .constant('expensesUrlMockEmulateWebMocky', 'http://www.mocky.io/v2/53bfa698ea38eada070472b5')
    .constant('editExpensesUrlMockEmulateWebMocky', 'http://www.mocky.io/v2/53bfa698ea38eada070472b5');


