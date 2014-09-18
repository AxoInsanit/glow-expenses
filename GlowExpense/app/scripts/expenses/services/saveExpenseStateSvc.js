'use strict';

angular.module('Expenses').factory('saveExpenseStateSvc', [function() {

    var expense = null;
    var image = null;

    function set(value){
        expense = value;
    }

    function get(){
        return expense;
    }

    function setImage(value){
        image = value;
    }

    function getImage(){
        return image;
    }

    return {
        set: set,
        get: get,
        setImage: setImage,
        getImage: getImage
    };
}
]);
