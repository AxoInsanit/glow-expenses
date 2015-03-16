'use strict';

angular.module('Login').factory('userResource', function($q, $http, baseUrlMockeyWeb, oAuthLoginUri, oAuthRedirectPath,
                                                    oAuthClientId, glowKey, glowRegisterPath, oAuthInAppBrowser, $rootScope,
                                                    globerUrl, sessionToken, localStorageSvc, globerStorageKey) {


        $rootScope.$on('global::signOut', function () {
            localStorageSvc.removeItem(globerStorageKey);
            localStorageSvc.removeItem(sessionToken);
        });

        return {
            getToken: function () {
                return localStorageSvc.getItem(sessionToken);
            },
            login: function () {
                var oAuthUri,
                    params = {
                        scope: 'email profile',
                        state: '/profile',
                        redirect_uri: baseUrlMockeyWeb + oAuthRedirectPath,
                        response_type: 'token',
                        client_id: oAuthClientId
                    },
                    queryParams = [],
                    deferred = $q.defer();


                // build oAuth URI
                angular.forEach(params, function (value, key) {
                    queryParams.push(key + '=' + encodeURIComponent(value));
                });
                oAuthUri = oAuthLoginUri + '?' + queryParams.join('&');

                function glowRegister(oAuthToken) {
                    $http({
                        url: baseUrlMockeyWeb + glowRegisterPath,
                        method: 'GET',
                        params: {
                            token: oAuthToken,
                            key: glowKey
                        }
                    }).then(function (response) {
                        localStorageSvc.setItem(sessionToken, response.data.session_token);
                        deferred.resolve();
                    }, function () {
                        deferred.reject();
                    });
                }

                function loginRejected() {
                    deferred.reject();
                }

                oAuthInAppBrowser.login(oAuthUri, glowRegister, loginRejected);

                return deferred.promise;
            },
            getGlober: function (force) {
                var storedUser = localStorageSvc.getItem(globerStorageKey),
                    promise;

                if (storedUser && !force) {
                    promise = $q.when(JSON.parse(storedUser));
                } else {
                    promise = $http.get(baseUrlMockeyWeb + globerUrl, {params: {token: this.getToken()}}).then(function (response) {
                        if (localStorageSvc.getItem(response.data.glober.email) === null) {
                            localStorageSvc.setItem(response.data.glober.email, JSON.stringify({}));
                        }
                        localStorageSvc.setItem(globerStorageKey, JSON.stringify(response.data.glober));
                        return response.data.glober;
                    });
                }
                return promise;
            }
        };
    }

);
