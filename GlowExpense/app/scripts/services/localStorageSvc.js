'use strict';

angular.module('Services').factory('localStorageSvc', [function(){

    function setItem(key, value){
        localStorage.setItem(key, value);
    }

    function getItem(key){
        return localStorage.getItem(key);
    }

    return {
        setItem: setItem,
        getItem: getItem
    };
}
]);
