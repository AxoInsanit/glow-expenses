'use strict';

angular.module('Directives').directive('getFocus', function() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            if (scope.$index === scope.selectedReportIndex){
                element.focus();
            }
        }
    };
});