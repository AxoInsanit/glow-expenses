'use strict';

angular.module('Services').factory('expenseTypesSvc', [function(){

        var expenseTypes = [];

        function get(){
            return expenseTypes;
        }

        function set(expenseTypesData){
            expenseTypes = expenseTypesData;
        }

        return {
            get: get,
            set: set
        };
    }
]);

