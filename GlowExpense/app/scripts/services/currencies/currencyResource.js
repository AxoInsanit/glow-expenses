'use strict';

angular.module('Services')
    .factory('currencyResource', function ($http, $q, localStorageSvc, sessionToken, currencyStorageKey, currenciesUrl,
                                           baseUrlMockeyWeb, userResource) {
        return {
            getCurrencies: function (force) {
                var storedCurrencies = localStorageSvc.getItem(currencyStorageKey),
                    promise;

                if (storedCurrencies && !force) {
                    promise = $q.when(JSON.parse(storedCurrencies));
                } else {
                    promise = $http.get(baseUrlMockeyWeb + currenciesUrl, {params: {token: userResource.getToken()}}).then(function (response) {
                        localStorageSvc.setItem(currencyStorageKey, JSON.stringify(response.data.currencies));
                        return response.data.currencies;
                    });
                }

                return promise;
            }
        };
    });
