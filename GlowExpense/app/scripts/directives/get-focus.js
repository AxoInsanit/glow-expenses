'use strict';

angular.module('Directives').directive('getFocus', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if (scope.$index === scope.selectedReportIndex){
                debugger;
                element.focus();
            }
        }
    };
});