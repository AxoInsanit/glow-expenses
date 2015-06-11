'use strict';

angular.module('Services')
    .service('transitionService', function transition($window, $state, $stateParams, $rootElement, $rootScope, $timeout,
                                                      $modalStack, requestNotificationChannelSvc) {

        var modifyRootElement = true,
            transitionService;

        function cleanRootElement() {
            return $rootElement.removeClass('slide-left')
                .removeClass('slide-right')
                .removeClass('slide-up')
                .removeClass('slide-down')
                .removeClass('bring-up');
        }

        $rootScope.$on('$stateChangeSuccess', function () {
            modifyRootElement = true;
            requestNotificationChannelSvc.requestEnded();
        });

        $rootScope.$on('$stateChangeStart', function () {
            requestNotificationChannelSvc.requestStarted();
            if (!!$modalStack.getTop()) {
                $modalStack.dismissAll();
            }
        });

        transitionService =  {
            reload: function () {
                cleanRootElement();
                var params = angular.copy($stateParams);

                $state.go($state.current, params, {
                    inherit: false,
                    notify: true,
                    location: 'replace',
                    reload: true
                });
            },
            back: function () {
                if (modifyRootElement) {
                    cleanRootElement().addClass('slide-right');
                    modifyRootElement = false;
                }
                if ($state.current.name !== 'home' && $state.current.name !== 'login') {
                    $window.history.back();
                }
            },
            go: function (params) {
                console.log(params);
                var stateName = params.name,
                    stateParams = params.params || {},
                    stateOptions = {},
                    direction = params.direction;

                if (params.replace === true) {
                    stateOptions.location = 'replace';
                }

                if (params.reload === true) {
                    stateOptions.reload = true;
                }

                if (modifyRootElement) {
                    switch (direction) {
                        case 'forward':
                            cleanRootElement().addClass('slide-left');
                            break;
                        case 'backward':
                            cleanRootElement().addClass('slide-right');
                            break;
                        case 'up':
                            cleanRootElement().addClass('slide-up');
                            break;
                        case 'down':
                            cleanRootElement().addClass('slide-down');
                            break;
                        case 'fade-center':
                            cleanRootElement().addClass('fade-center');
                            break;
                        default:
                            cleanRootElement();
                            break;
                    }
                    modifyRootElement = false;
                }

                $timeout(function () {
                    $state.go(stateName, stateParams, stateOptions);
                }, 0);
            }
        };

        $window.document.addEventListener('backbutton', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (!!$modalStack.getTop()) {
                $modalStack.dismissAll();
            } else {
                transitionService.back();
            }
        }, true);

        return transitionService;
    });
