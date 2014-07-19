'use strict';

angular.module('Services').factory('currenciesSvc', [function(){

        var currencies = [];

        function get(){
            return currencies;
        }

        function set(currenciesData){
            currencies = currenciesData;
        }

        return {
            get: get,
            set: set
        };
    }
]);
