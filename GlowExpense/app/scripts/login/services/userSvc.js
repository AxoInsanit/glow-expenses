'use strict';

angular.module('Login').factory('UserSvc', function($q, $http, baseUrlMockeyWeb, oAuthLoginUri, oAuthRedirectPath,
                                                    oAuthClientId, glowKey, glowRegisterPath, oAuthInAppBrowser) {
    return {
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
            deferred.resolve(response.data.session_token);
          }, function () {
            deferred.reject();
          });
        }

        function loginRejected () {
          deferred.reject();
        }

        oAuthInAppBrowser.login(oAuthUri, glowRegister, loginRejected);

        return deferred.promise;
      }
    };
  }
);
