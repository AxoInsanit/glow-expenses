'use strict';

angular.module('Services').factory('currenciesSvc', function(currenciesRepositorySvc, localStorageSvc, sessionToken,
                                                             errorHandlerDefaultSvc, $q){

        var currencies,
            deferred = $q.defer();

        function get(){
            if (currencies) {
                deferred.resolve(currencies);
            } else {
                currenciesRepositorySvc.getCurrencies({
                        token: localStorageSvc.getItem(sessionToken)
                    },
                    function (result) {
                        set(result.currencies);
                        deferred.resolve(currencies);
                    },
                    function () {
                        deferred.reject();
                        errorHandlerDefaultSvc.handleError(arguments);
                    }

                );
            }

            return deferred.promise;
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
);
