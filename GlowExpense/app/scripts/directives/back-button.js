'use strict';

angular.module('Directives')
    .directive('backButton', function(transitionService) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.on('click', function() {
                    if (scope.backStateName) {
                        transitionService.go({
                            name: scope.backStateName,
                            params: scope.backStateParams || {},
                            replate: true,
                            direction: 'backward'
                        });
                    } else {
                        transitionService.back();
                    }
                });
            }
        };
    });
