'use strict';

angular.module('Services')
    .factory('contableCodeResource', function ($http, $q, contableCodeStorageKey, contableCodesUrl, baseUrlMockeyWeb,
                                               userResource, localStorageSvc) {
        return {
            getContableCodes: function (force) {
                var storedContableCodes = localStorageSvc.getItem(contableCodeStorageKey),
                    promise;

                if (storedContableCodes && !force) {
                    promise = $q.when(JSON.parse(storedContableCodes));
                } else {
                    promise = $http.get(baseUrlMockeyWeb + contableCodesUrl, {params: {token: userResource.getToken()}}).then(function (response) {
                        localStorageSvc.setItem(contableCodeStorageKey, JSON.stringify(response.data.contableCodes));
                        return response.data.contableCodes;
                    });
                }

                return promise;
            }
        };
    });
