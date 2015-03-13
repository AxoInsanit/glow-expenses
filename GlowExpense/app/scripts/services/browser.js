'use strict';

angular.module('Services').service('BrowserSrv', function () {

    // returns a porcentage of scroll
    var getScrollPos = function($scope) {
        var pScroll;
        angular.element('.scroll-view').bind('scroll', function() {
            var maxScroll = this.scrollHeight - this.offsetHeight;
            pScroll = ( 1 - (maxScroll - this.scrollTop) / maxScroll) * 100;
            $scope.$emit('scroll-change', { scroll: pScroll });
        });
        return pScroll;
    };

    //return service
    return {
        getScrollPos: getScrollPos
    };
});