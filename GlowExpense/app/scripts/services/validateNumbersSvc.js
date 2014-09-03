'use strict';

angular.module('Services').factory('validateNumbersSvc', [function(){

    function validate(expense){
        var result = false;

        var exchangeRate = parseFloat(expense.exchangeRate);
        var originalAmount = parseFloat(expense.originalAmount);

        if ((exchangeRate && exchangeRate > 0) && (originalAmount && originalAmount > 0)){
            result = true;
        }

        return result;
    }



    return {
        validate: validate
    };
}
]);
