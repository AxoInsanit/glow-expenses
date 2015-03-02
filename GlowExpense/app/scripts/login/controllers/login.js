'use strict';
angular.module('Login')
    .controller('LoginCtrl', function ($scope, $location, requestNotificationChannelSvc, errorHandlerDefaultSvc, UserSvc,
                                       errorMsg, sessionToken, localStorageSvc, $q, currenciesRepositorySvc,
                                       contableCodesRepositorySvc, currenciesSvc, contableCodesSvc, userName) {

        function getCurrencies(token) {
            return currenciesRepositorySvc.getCurrencies({
                    token: token
                },
                function (result) {
                    currenciesSvc.set(result.currencies);
                },
                errorHandlerDefaultSvc.handleError
            );
        }
        function getContableCodes(token) {
            return contableCodesRepositorySvc.getContableCodes({
                    token: token
                },
                function (result) {
                    contableCodesSvc.set(result.contableCodes);
                },
                errorHandlerDefaultSvc.handleError
            );
        }

        function getGlober(token) {
            return UserSvc.getGlober(token).then(function (glober) {
                localStorageSvc.setItem(userName, glober.firstname + ' ' + glober.lastname);
            });
        }

        function load(token) {
            return $q.all([
                getContableCodes(token).$promise,
                getCurrencies(token).$promise,
                getGlober(token)]);
        }

        $scope.login = function() {
            // start loader
            requestNotificationChannelSvc.requestStarted();

            UserSvc.login().then(function (token) {
                if (localStorageSvc.localStorageExists()) {
                    localStorageSvc.setItem(sessionToken, token);
                }
                load(token).then(function () {
                    $location.path('/expenses');
                });

            }, function () {
                errorHandlerDefaultSvc.handleError({});
            }).finally(function () {
                requestNotificationChannelSvc.requestEnded();
            });
        };

        if (localStorageSvc.getItem('session-token')) {
            load(localStorageSvc.getItem('session-token')).then(function () {
                $location.path('/expenses');
            });
        }

    });
