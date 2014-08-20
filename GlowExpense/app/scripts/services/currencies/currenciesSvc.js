'use strict';

angular.module('Services').factory('currenciesSvc', [function(){

        var currencies = [];

        function get(){
            return currencies;
        }

        function set(currenciesData){
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
