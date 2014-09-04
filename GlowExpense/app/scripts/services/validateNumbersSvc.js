'use strict';

angular.module('Services').factory('validateNumbersSvc', [function(){

    function validate(expense){
        var result = false;

        if ((expense.exchangeRate && expense.exchangeRate > 0) && (expense.originalAmount && expense.originalAmount > 0)){
            result = true;
        }

        return result;
    }

    return {
        validate: validate
    };
}
]);
