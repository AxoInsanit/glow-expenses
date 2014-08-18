'use strict';

angular.module('Directives').directive('backButton', function() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.on('click', function() {
                //we go back in the history
                history.back();
                //we add the controlling class
                var element = document.getElementsByTagName('body')[0];
                element.className = element.className + ' backAnimation';
                //animation is 0.75 seconds so when animation is over we remove the controll class
                setTimeout(function(){
                    //we remove the controlling class
                    document.getElementsByTagName('body')[0].className = 'ng-scope';
                }, 1000);
            });
        }
    };
});