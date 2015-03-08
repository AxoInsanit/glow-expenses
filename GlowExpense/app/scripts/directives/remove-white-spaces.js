'use strict';
angular.module('Directives').directive('removeWhiteSpaces', function () {

    function link(scope) {

      var removeSpaces = function() {
          if (scope.ngModel) {
              //remove consecutive spaces
              scope.ngModel = scope.ngModel.replace(/\s+/g, ' ');

              //remove whitespace from start of string
              //use trimLeft instead if supported
              //scope.ngModel = scope.ngModel.trimLeft();
              if (scope.ngModel.charAt(0) === ' ') {
                  scope.ngModel = scope.ngModel.slice(1);
              }
          }
      };

      scope.$watch('ngModel', removeSpaces);
    }

    return {
        restrict: 'A',
        scope: {
            ngModel : '='
        },
        link: link
    };
});
