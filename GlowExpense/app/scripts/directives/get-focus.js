'use strict';

angular.module('Directives').directive('getFocus', function() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            //debugger;
            if (scope.$index === scope.selectedReportIndex){
                //debugger;
                element.focus();
            }
        }
    };
});