'use strict';

angular.module('Services').factory('currenciesSvc', [function(){

        var currencies = [];

        function get(){
            return currencies;
        }

        function set(currenciesData){
            if (!currenciesData) {
                console.warn('Currencies not set.');
                return false;
            }

            currenciesData.map(function(item){
                item.selected = false;
            });
            currencies = currenciesData;
        }

        return {
            get: get,
            set: set
        };
    }
]);
