'use strict';

angular.module('Services')
    .factory('repositoryBaseSvc', function($http, $q) {
        function httpRequest(method, url, data, params) {
            var deferred = $q.defer();
            $http({
                method: method,
                url: url,
                data: data,
                params: params
            })
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(data) {
                deferred.reject(data);
            });
            return deferred.promise;
        }

        return {
            executeRequest: httpRequest
        };
    }
);
