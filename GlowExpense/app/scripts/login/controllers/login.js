'use strict';
angular.module('Login')
    .controller('LoginCtrl', function ($scope, transitionService, requestNotificationChannelSvc, errorHandlerDefaultSvc,
                                       userResource, errorMsg, sessionToken, localStorageSvc, $q, currencyResource,
                                       contableCodeResource) {

        function getCurrencies() {
            return currencyResource.getCurrencies(true);
        }
        function getContableCodes() {
            return contableCodeResource.getContableCodes(true);
        }

        function getGlober() {
            return userResource.getGlober();
        }

        function load() {
            return $q.all([
                getContableCodes(),
                getCurrencies(),
                getGlober()
            ]);
        }

        $scope.login = function() {
            // start loader
            requestNotificationChannelSvc.requestStarted();

            userResource.login().then(function () {
                load().then(function () {
                    transitionService.go({
                        name: 'home',
                        direction: 'down'
                    });
                });

            }, function () {
                errorHandlerDefaultSvc.handleError({});
            }).finally(function () {
                requestNotificationChannelSvc.requestEnded();
            });
        };

        if (userResource.getToken()) {
            load().then(function () {
                transitionService.go({
                    name: 'home',
                    direction: 'down'
                });
            });
        }

    });
