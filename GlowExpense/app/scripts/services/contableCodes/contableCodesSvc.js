/**
 * Created by diego.caro on 07/11/2014.
 */
'use strict';

angular.module('Services')
    .factory('contableCodesSvc', function(contableCodesRepositorySvc, errorHandlerDefaultSvc, sessionToken,
                                          localStorageSvc, $q) {

        var contableCodes,
            deferred = $q.defer();

        function get() {
            if (contableCodes) {
                deferred.resolve(contableCodes);
            } else {
                contableCodesRepositorySvc.getContableCodes({
                        token: localStorageSvc.getItem(sessionToken)
                    },
                    function (result) {
                        set(result.contableCodes);
                        deferred.resolve(contableCodes);
                    },
                    function () {
                        deferred.reject();
                        errorHandlerDefaultSvc.handleError(arguments);
                    }

                );
            }

            return deferred.promise;
        }

        function set(contableCodesData) {
            if (!contableCodesData) {
                console.warn('Contable codes not set.');
                return false;
            }

            contableCodesData.map(function (item) {
                item.selected = false;
            });
            contableCodes = contableCodesData;
        }

        return {
            get: get,
            set: set
        };
    });
