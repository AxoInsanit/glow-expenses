'use strict';

angular.module('Directives').directive('numberFocus', function () {
    
    return {
        
        restrict: 'A',
        
        link: function ( scope, element, attrs) {

            element.on('focus', function( event ) {

                if (element.val() === '0.00') {
                    element.val('')
                    element[0].placeholder = '';
                }
            });
        }
    };

});