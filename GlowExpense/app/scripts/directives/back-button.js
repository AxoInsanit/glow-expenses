'use strict';

angular.module('Directives').directive('backButton', function() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.on('click', function() {
                history.back();
            });
        }
    };
});