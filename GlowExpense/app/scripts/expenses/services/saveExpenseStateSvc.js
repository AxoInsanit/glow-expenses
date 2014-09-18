'use strict';

angular.module('Expenses').factory('saveExpenseStateSvc', [function() {

    var expense = null;

    function set(value){
        expense = value;
    }

    function get(){
        return expense;
    }

    return {
        set: set,
        get: get
    };
}
]);
