/* jshint-W117 */
'use strict';

// Define the angular module.
angular.module('Directives', [])
    .directive('swipeAndSnap', function () {
        return {
            scope: {},
            link: function (scope, element, attr) {

                var activeView = parseInt(attr.activeView, 10);

                scope.$on('swipeAndSnap::changeView', function (e, viewIndex) {
                    activeView = viewIndex;
                    mySwiper.slideTo( activeView,500 /*transition duration*/, false /*callback*/);
                });

                function notifyViewChange() {
                    if (attr.onPanEnd) {
                        scope.$parent.$eval(attr.onPanEnd, {$activeView: activeView});
                    }
                }

                var mySwiper  = new Swiper('.swiper-container',{
                    onSlideChangeEnd : function() {
                        activeView = mySwiper.activeIndex;
                        notifyViewChange();
                    },
                    resistanceRatio: 0,
                    slidesPerView: 1
                });
                mySwiper.slideTo(activeView, 0 /*transition duration*/, false /*callback*/);
            }
        };
    });