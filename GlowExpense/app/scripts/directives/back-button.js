'use strict';

angular.module('Directives')
    .directive('backButton', function($rootElement) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.on('click', function() {
                    $rootElement.addClass('backAnimation');
                    window.history.back();
                });
            }
        };
    }).directive('container', function ($rootElement) {
        return {
            restrict: 'C',
            link: function (scope, element) {
                element.on('transitionend webkitTransitionEnd', function () {
                    $rootElement.removeClass('backAnimation');
                });
            }
        };
    });
